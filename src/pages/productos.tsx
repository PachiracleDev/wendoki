import Banner from "@components/banner";
import AllProducts from "@components/products/AllProducts";
import FilterIcon from "@components/products/AllProducts/Filter/FilterIcon";
import Filter from "@components/products/AllProducts/Filter";
import SortBy from "@components/products/AllProducts/SortBy";
import LayoutMain from "@layout/index";
import { useState } from "react";
import { FilterProvider } from "@store/filterProducts";
import { Product } from "models/Product";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";
import Buscador from "@components/buscador";

export const getStaticProps = async () => {
	const doc = await DocumentGoogleSheet();
	const rows = await doc.sheetsByIndex[0].getRows();
	const AllProductos = rows.map((row) => ({
		nombre: row.nombre,
		precio: +row.precio,
		imagenes: JSON.parse(row.imagenes),
		descripcion: row.descripcion,
		categoria: row.categoria,
		stock: +row.stock,
		descuento: +row.descuento,
		fechaDescuento: row.fechaDescuento || "",
		slug: row.slug,
		marca: row.marca,
		color: row.color,
		destacado: row.destacado,
		subcategoria: row.subcategoria || "",
	}));

	return {
		props: {
			products: AllProductos,
		},
	};
};

const getUniqueBrands = (items: Product[]) => {
	return items
		.reduce((acc: any, item: Product) => {
			if (!acc.includes(item.marca)) {
				acc.push(item.marca);
			}
			return acc;
		}, [])
		.filter((item: any) => item);
};

const getCategories = (productos: Product[]) => {
	const categoriasObj = [] as any;
	for (const producto of productos) {
		const categoria = producto.categoria;
		const subcategoria = producto.subcategoria;
		if (!categoriasObj[categoria]) {
			categoriasObj[categoria] = { nombre: categoria, subcategorias: [] };
		}
		if (
			subcategoria &&
			!categoriasObj[categoria].subcategorias.includes(subcategoria)
		) {
			categoriasObj[categoria].subcategorias.push(subcategoria);
		}
	}
	const categoriasArr = Object.values(categoriasObj);
	return categoriasArr;
};

function ProductosPage({ products }: { products: Product[] }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<LayoutMain>
			<div className="mt-16" />
			<Banner
				title="Tiendita ❤️"
				subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
				urlImage="https://res.cloudinary.com/diprat1kf/image/upload/v1698865808/minha-baek-QXqBcIsbgiw-unsplash_fhofsp.jpg"
				fullWidth={false}
				description=" Desde peluches suaves y coloridos hasta papelería con diseños encantadores, aquí encontrarás todo lo que necesitas para añadir un toque de ternura a tu vida."
			/>
			<FilterProvider initialProducts={products}>
				<Buscador />
				<div className="my-3 ">
					<div className="flex justify-between xl:justify-end xl:px-20 px-3 items-center">
						<SortBy />
						<FilterIcon setIsOpen={setIsOpen} />
					</div>
				</div>
				<div className="flex gap-8">
					<Filter
						categorias={getCategories(products)}
						marcas={getUniqueBrands(products)}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
					/>
					<AllProducts />
				</div>
			</FilterProvider>
		</LayoutMain>
	);
}

export default ProductosPage;
