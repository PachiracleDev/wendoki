import Layout from "@layout/index";
import { Product, ProductCart } from "models/Product";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { actionTypes, useCartStore } from "@store/cartshopping";
import { verifyDiscount } from "@utils/verifyDiscount";
import Image from "next/image";
import { useRouter } from "next/router";
import DiscountQuantity from "@components/products/NoStock/DiscountQuantity";

function NoStockPage() {
	const nostockCart = Cookies.get("nostock");
	const router = useRouter();
	const { dispatch } = useCartStore();
	const [productos, setProductos] = useState<ProductCart[]>([]);
	const [activateButton, setActivateButton] = useState(false);

	useEffect(() => {
		if (nostockCart) {
			setProductos(JSON.parse(nostockCart));
			if (JSON.parse(nostockCart).length === 0) {
				router.push("/");
			}
		}
	}, [nostockCart]);

	return (
		<Layout>
			<div className="flex max-w-5xl justify-center my-4 lg:my-24 flex-col items-center mx-auto gap-4">
				<span className="text-3xl">😢</span>
				<p className="text-gray-500">
					No tenemos suficiente stock para estos productos:
				</p>
				<div className="flex flex-col gap-3 w-11/12 lg:w-1/2 justify-center">
					{productos?.map((item) => {
						const price =
							item.descuento > 0 && verifyDiscount(item.fechaDescuento)
								? item?.precio - (item?.precio * item?.descuento) / 100
								: item?.precio;

						return (
							<div
								key={item.slug}
								className="flex justify-between w-full border shadow items-center relative"
							>
								{item.descuento > 0 && verifyDiscount(item.fechaDescuento) && (
									<div className="bg-red-500 p-1 rounded-md absolute top-[-14px] font-bold font-sans right-2 text-white text-[8px]">
										OFERTA {item.descuento}%
									</div>
								)}
								<div className="flex gap-2 h-40  items-center">
									<Link href={`/producto/${item.slug}`}>
										<div className="w-32 relative h-40">
											<Image src={item.imagenes[0]} fill alt={item.nombre} />
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
										<p className="text-red-400 font-bold text-xs">
											Solo tenemos {item.stock} unidades disponibles
										</p>

										<DiscountQuantity
											quantityInitial={item.cantidad}
											setProductos={setProductos}
											max={item.stock}
											setActivateButton={setActivateButton}
											slug={item.slug}
										/>
									</div>
								</div>
								<div className="px-4">
									<BsTrash
										onClick={() => {
											const newProducts = productos.filter(
												(p) => p.slug !== item.slug
											);
											setProductos(
												productos.filter((p) => p.slug !== item.slug)
											);

											Cookies.set("nostock", JSON.stringify(newProducts));

											if (productos.length === 1) {
												router.push("/");
											}
											dispatch({
												type: actionTypes.REMOVE_FROM_CART,
												payload: item,
											});
										}}
										size={17}
										className="text-gray-500 cursor-pointer hover:text-red-500"
									/>
								</div>
							</div>
						);
					})}
				</div>
				{activateButton && (
					<button
						onClick={() => {
							Cookies.set("nostock", JSON.stringify([]));
							Cookies.set("cart", JSON.stringify(productos));
							router.push("/pasarela");
						}}
						className="btn w-11/12 mx-auto max-w-lg text-center px-4 py-2 text-sm"
					>
						Comprar
					</button>
				)}

				<Link
					href="/"
					className="rounded border-primary border text-primary px-4 py-2 text-sm"
				>
					Volver al inicio
				</Link>
			</div>
			<p className="text-gray-500 text-sm text-center">
				En caso precises más información, puedes escribirnos a nuestro WhatsApp
				<Link
					target="_blank"
					className="text-green-500 font-bold ml-3"
					href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&text=Hola, quiero comprar un producto que no está en stock.`}
				>
					Clic aquí
				</Link>
			</p>
		</Layout>
	);
}

export default NoStockPage;
