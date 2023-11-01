import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";
import { getDateNow } from "@utils/getDate";
import { v4 as uuidv4 } from "uuid";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { infoEnvio, products } = req.body;

	try {
		const doc = await DocumentGoogleSheet();
		const productosAcortado = products.map((producto: any) => ({
			nombre: producto.nombre,
			cantidad: producto.cantidad,
		}));

		const orders = doc.sheetsByIndex[1];
		const compraId = uuidv4().slice(0, 8).toString();
		await orders.addRow({
			compraId,
			fechaDeCompra: getDateNow(),
			estado: "PENDIENTE",
			productos: JSON.stringify(productosAcortado),
			pagoAbonado: 0,
			metodoDePago: "CONTRAENTREGA",
			departamento: infoEnvio.departamento,
			distrito: infoEnvio.distrito,
			direccion: infoEnvio.direccion,
			referencia: infoEnvio.referencia,
			telefono: infoEnvio.telefono.toString(),
			correo: "N/A",
			nombreCompleto: infoEnvio.nombreCompleto,
		});

		return res.status(200).json({
			operationId: compraId,
		});
	} catch (error) {
		console.log("error", error);
		return res.status(400).json({
			message: "Error al crear la orden",
		});
	}
});

export default handler;
