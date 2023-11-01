import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";
import { getDateNow } from "@utils/getDate";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { compraId, correo, infoEnvio, products, amount, status } = req.body;

	try {
		if (status === "COMPLETED") {
			const doc = await DocumentGoogleSheet();
			const productosAcortado = products.map((producto: any) => ({
				nombre: producto.nombre,
				cantidad: producto.cantidad,
			}));

			const rows = await doc.sheetsByIndex[0].getRows();

			for (const producto of products) {
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
				compraId: compraId.toString(),
				fechaDeCompra: getDateNow(),
				estado: "APROBADO",
				productos: JSON.stringify(productosAcortado),
				pagoAbonado: amount.toString() + " USD",
				metodoDePago: "PAYPAL",
				departamento: infoEnvio.departamento,
				distrito: infoEnvio.distrito,
				direccion: infoEnvio.direccion,
				referencia: infoEnvio.referencia,
				telefono: infoEnvio.telefono.toString(),
				correo,
				nombreCompleto: infoEnvio.nombreCompleto,
			});

			return res.status(200).json({
				operationId: compraId,
			});
		} else {
			return res.status(400).json({
				message: "Error al realizar el pago",
			});
		}
	} catch (error) {
		return res.status(400).json({
			message: "Error al realizar el pago",
		});
	}
});

export default handler;
