import LayoutMain from "@layout/index";
import React, { useEffect } from "react";
import { AiFillHome, AiOutlineRight } from "react-icons/ai";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import AddToCart from "@components/productoOne/AddToCart";
import CuentaRegresiva from "@components/products/ConteoRegresiva";
import { getColorTailwind } from "@utils/getColorTailwind";
import { Product } from "models/Product";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";

export const getStaticProps = async ({ params }: any) => {
	const slug = params.slug;

	if (typeof slug !== "string") {
		return {
			notFound: true,
		};
	}

	try {
		const doc = await DocumentGoogleSheet();

		const rows = await doc.sheetsByIndex[0].getRows();

		const AllProductos = rows.map((row) => ({
			nombre: row.nombre,
			precio: +row.precio,
			imagenes: JSON.parse(row.imagenes),
			descripcion: row.descripcion,
			categoria: row.categoria || "",
			stock: +row.stock,
			descuento: +row.descuento,
			fechaDescuento: row.fechaDescuento || "",
			slug: row.slug,
			marca: row.marca || "",
			color: row.color,
			destacado: row.destacado,
			subcategoria: row.subcategoria || "",
		}));

		if (slug) {
			const product = AllProductos.find(
				(producto) => producto.slug.toLowerCase() === slug
			) as any;

			if (!product) {
				return {
					notFound: true,
				};
			}
			return {
				props: {
					product,
				},
			};
		} else {
			return {
				notFound: true,
			};
		}
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export const getStaticPaths = async () => {
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
			descuento: +row.descuento,
			fechaDescuento: row.fechaDescuento,
			slug: row.slug,
			marca: row.marca,
			color: row.color,
			destacado: row.destacado,
			subcategoria: row.subcategoria,
		}));

		let allSlugs: string[] = [];
		AllProductos.map((row: Product) => {
			allSlugs.push(row.slug.trim());
		});

		const paths = allSlugs.map((slug: string) => ({
			params: { slug },
		}));

		return {
			paths,
			fallback: false,
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

function ProductPage({ product }: { product: Product }) {
	const [mounted, setMounted] = React.useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<LayoutMain>
			<div className="flex my-12 flex-col max-w-5xl lg:items-center lg:mx-auto gap-4 lg:flex-row w-full ">
				<div className="flex flex-col items-center">
					<div className="flex mb-3 border w-11/12 capitalize mx-auto rounded-md max-w-lg shadow items-center text-sm p-2 gap-2 text-gray-500">
						<AiFillHome size={18} />
						<AiOutlineRight size={18} />

						{product.categoria}

						<AiOutlineRight size={18} />

						{product.nombre}
					</div>
					<div className="w-screen relative h-[500px] flex justify-center sm:max-w-lg">
						<Swiper
							modules={[Navigation, Pagination, Scrollbar, A11y]}
							spaceBetween={0}
							grabCursor={true}
							slidesPerView={1}
							navigation
							pagination={{ clickable: true }}
							scrollbar={{ draggable: true }}
						>
							{product.imagenes.map((image: string) => (
								<SwiperSlide key={image} className="">
									{
										<div className="relative w-[500px] h-[500px]">
											<Image
												alt={product.nombre}
												src={image}
												fill
												className="object-cover"
											/>
										</div>
									}
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
				<div className="w-11/12 mb-12 sm:max-w-lg mt-12 lg:mt-0 relative  mx-auto ">
					<div className="bg-gray-200 mt-2 rounded-md p-2 text-sm mb-4 max-w-xs">
						Stock: {product.stock} unidades
					</div>
					{product.descuento > 0 && !!product.fechaDescuento && (
						<div className="flex z-10 text-[10px] absolute top-[-40px] gap-4  font-bold right-2">
							<CuentaRegresiva dateEnd={product.fechaDescuento} />
							<div className="bg-red-500 text-white rounded-md px-3 py-2 ">
								OFERTA {product.descuento}%
							</div>
						</div>
					)}
					{product.destacado === "TRUE" && (
						<div className="bg-primary z-10 text-white font-bold rounded-md px-3 py-2 absolute bottom-[-50px] left-2 text-xs">
							DESTACADO
						</div>
					)}
					<div className="text-left">
						<span className="font-bold text-gray-500 whitespace-nowrap max-w-[220px] leading-6">
							{product.marca?.toUpperCase()}
						</span>
						<h2 className="font-medium text-xl capitalize">{product.nombre}</h2>
						<div className="flex gap-2 items-center">
							<span className="font-medium text-sm capitalize  whitespace-nowrap max-w-[220px]">
								{product?.categoria}
							</span>
							{product.color && (
								<div
									className={`border rounded-full p-2 w-2 h-2 ${getColorTailwind(
										product?.color.toLowerCase()
									)}`}
								/>
							)}
						</div>
						<p className="text-gray-500 text-sm py-4">
							Descripción: {product.descripcion}
						</p>
						{mounted && (
							<p className="text-gray-500 text-lg font-sans">
								{product?.descuento > 0 ? (
									<div className="flex gap-2 items-center">
										<span className="line-through text-gray-500">
											S/{product?.precio}
										</span>
										<span className="text-primary">
											S/
											{(
												product?.precio -
												(product?.precio * product?.descuento) / 100
											)?.toFixed(2)}
										</span>
									</div>
								) : (
									`S/${product?.precio}`
								)}
							</p>
						)}
					</div>
					<div className="flex mt-3 justify-end">
						<AddToCart product={product} />
					</div>
				</div>
			</div>
		</LayoutMain>
	);
}

export default ProductPage;
