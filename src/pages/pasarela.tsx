import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState, useEffect } from "react";
import { useMercadopago } from "react-sdk-mercadopago";
import { useSnackbar } from "notistack";
import LayoutMain from "@layout/index";
import Image from "next/image";
import DatosEnvio from "@components/forms/DatosEnvio";
import Link from "next/link";
import { verifyDiscount } from "@utils/verifyDiscount";
import { Fireworks } from "@fireworks-js/react";
import { Product, ProductCart } from "models/Product";
import { DocumentGoogleSheet } from "@utils/DocumentGoogleSheet";
import Cookies from "js-cookie";
import MercadoPago from "@components/pasarela/MercadoPago";
import Payment from "@components/pasarela/Payment";

type PasarelaPageProps = {
	amount: number;
	products: ProductCart[];
};

export const getServerSideProps: GetServerSideProps<
	PasarelaPageProps
> = async ({ req, res }) => {
	const cart = req.cookies["cart"] || "[]";
	const products = JSON.parse(cart);

	if (products.length === 0) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
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

		let productosSinStock = [] as any;

		const verifysStock = products.every((product: ProductCart) => {
			const { stock } = AllProductos.find(
				(producto) => producto.slug === product.slug
			) as any;
			if (stock < +product.cantidad) {
				productosSinStock.push({
					...product,
					stock,
				});
			}

			return stock >= +product.cantidad;
		});

		if (productosSinStock.length > 0) {
			res.setHeader(
				"Set-Cookie",
				`nostock=${encodeURIComponent(
					JSON.stringify(productosSinStock)
				)}; Path=/; `
			);
		}

		if (!verifysStock) {
			return {
				redirect: {
					destination: "/no-stock",

					permanent: false,
				},
			};
		}

		return {
			props: {
				amount,
				products,
			},
		};
	} catch (error) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
};

type ResultPayment = {
	status: "approved" | "pending" | "rejected" | "refunded" | "canceled";
	status_detail: string;
	operationId: string;
};

function PasarelaDePagoPage({
	amount,
	products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [finish, setFinish] = useState(false);

	const [infoEnvio, setInfoEnvio] = useState();

	return (
		<LayoutMain>
			<div className="flex flex-col lg:flex-row relative my-12 justify-center w-full items-center lg:items-start gap-2">
				<div className="w-full lg:sticky lg:top-24 lg:max-w-lg flex flex-col gap-3 items-center">
					<h2 className="text-2xl font-bold text-center">Productos</h2>
					<div className="flex gap-5 flex-col w-full items-center">
						{products.map((item) => {
							const price = (
								item.descuento > 0 && verifyDiscount(item.fechaDescuento)
									? (
											item?.precio -
											(item?.precio * item?.descuento) / 100
									  ).toFixed(2)
									: item?.precio
							) as number;

							return (
								<div
									key={item.slug}
									className="flex justify-between max-w-sm w-full border shadow items-center relative"
								>
									{item.descuento > 0 &&
										verifyDiscount(item.fechaDescuento) && (
											<div className="bg-red-500 px-2 py-1 rounded-md absolute top-[-14px] font-bold font-sans right-2 text-white text-[10px]">
												OFERTA {item.descuento}%
											</div>
										)}
									<div className="flex gap-2 h-20  items-center">
										<Link target="_blank" href={`/producto/${item.slug}`}>
											<div className="w-16 relative h-20">
												<Image
													className="object-cover"
													src={item.imagenes[0]}
													fill
													alt={item.nombre}
												/>
											</div>
										</Link>

										<div className="flex flex-col overflow-hidden font-light text-xs sm:text-sm leading-4 font-sans">
											<span className="font-bold text-primary whitespace-nowrap max-w-[280px]">
												{item.nombre}
											</span>
											<span className="text-gray-500 flex items-center gap-2 text-xs">
												{item.descuento > 0 &&
												verifyDiscount(item.fechaDescuento) ? (
													<div className="flex gap-1 items-center">
														<span className="line-through text-gray-500">
															S/{item?.precio}
														</span>
														<span className="text-primary">
															S/
															{price}
														</span>
													</div>
												) : (
													`S/${item?.precio}`
												)}{" "}
												x {item.cantidad}
											</span>
											<span className="text-xs">
												S/{(price * item.cantidad).toFixed(2)}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="text-sm mt-3 sm:text-base">
						<div className="  p-1">
							Total: <span className="font-bold font-sans">S/{amount}</span>
						</div>
						<div className="p-1">
							Envio: <span className="font-bold font-sans">Consultar</span>
						</div>
					</div>
				</div>
				<div className="w-full p-2 md:max-w-lg">
					<div>
						<h2 className="text-2xl font-bold text-center">Datos de envio</h2>

						<DatosEnvio
							finish={finish}
							infoEnvio={infoEnvio}
							setInfoEnvio={setInfoEnvio}
						/>
						{infoEnvio && (
							<Payment
								finish={finish}
								setFinish={setFinish}
								amount={amount}
								infoEnvio={infoEnvio}
								products={products}
							/>
						)}
					</div>
				</div>
			</div>
		</LayoutMain>
	);
}

export default PasarelaDePagoPage;
