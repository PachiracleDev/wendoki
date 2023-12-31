import Banner from "@components/banner";

import ListOfProducts from "@components/products/ListOfProducts";
import LayoutMain from "@layout/index";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";
import { Product } from "models/Product";
import Head from "next/head";

export async function getStaticProps() {
	try {
		const doc = await DocumentGoogleSheet();
		const rows = await doc.sheetsByIndex[0].getRows();
		const AllProductos = rows.map((row) => ({
			nombre: row.nombre,
			precio: +row.precio,
			imagenes: JSON.parse(row.imagenes),
			descripcion: row.descripcion,
			categoria: row.categoria,
			stock: +row.stock,
			descuento: row.descuento || 0,
			fechaDescuento: row.fechaDescuento || "",
			slug: row.slug,
			marca: row.marca || "",
			color: row.color,
			destacado: row.destacado,
			subcategoria: row.subcategoria || "",
		}));

		const productosDestacados = AllProductos.filter(
			(producto: Product) =>
				producto.destacado === "TRUE" || producto.destacado === "VERDADERO"
		).slice(0, 6);

		const actualDate = new Date();

		const productosDescuento = AllProductos.filter((producto: Product) => {
			const fechaStr = producto.fechaDescuento;
			if (!fechaStr) return false;
			const [dia, mes, anio] = fechaStr.split("/");
			const fecha = new Date(+anio, +mes - 1, +dia);

			return actualDate.getTime() < fecha.getTime();
		}).slice(0, 6);

		return {
			props: {
				productosDestacados,
				productosDescuento,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}

export default function Home({
	productosDestacados,
	productosDescuento,
}: {
	productosDestacados: Product[];
	productosDescuento: Product[];
}) {
	return (
		<>
			<LayoutMain>
				<Banner
					urlImage="https://res.cloudinary.com/diprat1kf/image/upload/v1698865807/not-pot-9RwNYnT6Pvk-unsplash_mt4eoh.jpg"
					description="tu destino para sumergirte en el mundo más adorable y encantador. Nuestra tienda está repleta de productos que te harán sonreír y sentir la magia del estilo kawaii."
					fullWidth
					subtitle="Donde la ternura se convierte en estilo."
					title="¡Bienvenido a Wendoki ❤️❤️!"
				/>

				<ListOfProducts
					title="Productos destacados"
					description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptate, quia, voluptates quas voluptatibus quibusdam"
					products={productosDestacados}
				/>
				<ListOfProducts
					title="Productos en oferta"
					description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, voluptate, quia, voluptates quas voluptatibus quibusdam"
					products={productosDescuento}
				/>
			</LayoutMain>
		</>
	);
}
