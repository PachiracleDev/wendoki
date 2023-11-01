import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";
import * as mp from "mercadopago";
import { verifyDiscount } from "@utils/verifyDiscount";
import { getDateNow } from "@utils/getDate";

const handler = nextConnect();
mp.configurations.setAccessToken(process.env.MERCADOPAGO_SECRET_KEY_TEST || "");

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const body = req.body?.processPaymentInput;

	try {
		const rta = await mp.payment.save(body);
		const { status, status_detail, id } = rta.body;

		if (status === "approved") {
			const doc = await DocumentGoogleSheet();
			const productosAcortado = body.metadata.productos.map(
				(producto: any) => ({
					nombre: producto.nombre,

					cantidad: producto.cantidad,
				})
			);

			const rows = await doc.sheetsByIndex[0].getRows();

			for (const producto of body.metadata.productos) {
				const productoVerdadero = rows.find(
					(row) => row.nombre === producto.nombre
				) as any;

				if (productoVerdadero) {
					productoVerdadero.stock = (
						+productoVerdadero.stock - +producto.cantidad
					).toString();

					await productoVerdadero.save();
				}
			}

			const orders = doc.sheetsByIndex[1];
			await orders.addRow({
				compraId: id.toString(),
				fechaDeCompra: getDateNow(),
				estado: "APROBADO",
				productos: JSON.stringify(productosAcortado),
				pagoAbonado: body.transaction_amount.toString() + " PEN",
				metodoDePago: "MERCADOPAGO",
				departamento: body.metadata.infoEnvio.departamento,
				distrito: body.metadata.infoEnvio.distrito,
				direccion: body.metadata.infoEnvio.direccion,
				referencia: body.metadata.infoEnvio.referencia,
				telefono: body.metadata.infoEnvio.telefono.toString(),
				correo: body.payer.email,
				nombreCompleto: body.metadata.infoEnvio.nombreCompleto,
			});

			return res.status(200).json({
				status,
				status_detail,
				operationId: id,
			});
		}
	} catch (error) {
		res.status(400).json({
			message: "Error al realizar el pago",
		});
	}
});

export default handler;
