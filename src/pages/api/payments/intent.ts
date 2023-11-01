import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";
import { verifyDiscount } from "@utils/verifyDiscount";
import { Product, ProductCart } from "models/Product";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const body = req.body.cart;
	const products = JSON.parse(body);

	const doc = await DocumentGoogleSheet();
	const rows = await doc.sheetsByIndex[0].getRows();
	const AllProductos = rows.map((row) => ({
		nombre: row.nombre,
		precio: +row.precio,
		imagenes: JSON.parse(row.imagenes),
		descripcion: row.descripcion,
		categoria: row.categoria,
		stock: +row.stock,
		descuento: row.descuento,
		fechaDescuento: row.fechaDescuento,
		slug: row.slug,
		marca: row.marca,
		color: row.color,
		destacado: row.destacado,
		subcategoria: row.subcategoria,
	}));

	const amount = products
		.reduce((acc: number, item: ProductCart) => {
			const itemVerdadero = AllProductos.find(
				(producto) => producto.slug === item.slug
			) as Product;

			return (
				acc +
				(itemVerdadero.descuento > 0 &&
				verifyDiscount(itemVerdadero.fechaDescuento)
					? itemVerdadero?.precio -
					  (itemVerdadero?.precio * itemVerdadero?.descuento) / 100
					: itemVerdadero.precio) *
					item.cantidad
			);
		}, 0)
		.toFixed(2);

	const verifysStock = products.every((product: ProductCart) => {
		const { stock } = AllProductos.find(
			(producto) => producto.slug === product.slug
		) as any;
		return stock >= +product.cantidad;
	});

	if (!verifysStock) {
		res.status(400).json({
			message: "No hay stock suficiente",
		});
	}

	return res.status(200).json({
		amount,
		products,
	});
});

export default handler;
