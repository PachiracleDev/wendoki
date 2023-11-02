import { useState, useEffect, Fragment } from "react";
import { BsTrash } from "react-icons/bs";
import { useCartStore, actionTypes } from "@store/cartshopping";
import { HiOutlineShoppingBag, HiXMark } from "react-icons/hi2";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { verifyDiscount } from "@utils/verifyDiscount";
import LoadingSubmit from "@components/UI/loadings/LoadingSubmit";

function CartIcon() {
	const { state, dispatch } = useCartStore();
	const [loading, setLoading] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<div
				onClick={() => setOpen(!open)}
				className="bg-gradient-to-r  cursor-pointer from-primary/60 to-primary shadow-md text-white p-2 rounded-full"
			>
				<div className="relative">
					<span className="bg-stone-900 p-1 px-2  bottom-5 left-5 text-xs rounded-full absolute text-white">
						{mounted &&
							state.cart.reduce((acc, item) => acc + item.cantidad, 0)}
					</span>
					<HiOutlineShoppingBag size={28} />
				</div>
			</div>

			<Transition appear show={open} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={setOpen}>
					<div
						className={`fixed inset-0 overflow-y-auto overflow-x-hidden ${
							open === false && "translate-x-[100%] duration-700"
						}`}
					>
						<Transition.Child
							as={Fragment}
							enterFrom="translate-x-[100%]"
							enterTo="translate-x-[0] "
							leave="ease-in duration-500 translate-x-[100%]"
							leaveFrom="translate-x-[0] "
							leaveTo="translate-x-[100%] "
						>
							<Dialog.Panel className="bg-white absolute right-0 border-l p-2 w-3/4 md:w-1/4  2xl:w-1/6 h-full">
								<div className="flex justify-between items-center">
									<h3 className="font-bold flex gap-1 items-center text-xl">
										<HiOutlineShoppingBag size={23} />
										CARRITO
									</h3>
									<HiXMark
										onClick={() => setOpen(false)}
										className="w-7 h-7   cursor-pointer"
									/>
								</div>
								<div className="p-3">
									<div className="flex flex-col gap-8 mt-4">
										{state.cart.map((item) => {
											const price = (
												item.descuento > 0 &&
												verifyDiscount(item.fechaDescuento)
													? (
															item?.precio -
															(item?.precio * item?.descuento) / 100
													  ).toFixed(2)
													: item?.precio
											) as number;

											return (
												<div
													key={item.slug}
													className="flex justify-between max-w-xs border shadow items-center relative"
												>
													{item.descuento > 0 &&
														verifyDiscount(item.fechaDescuento) && (
															<div className="bg-red-500 p-1 rounded-md absolute top-[-14px] font-bold font-sans right-2 text-white text-[8px]">
																OFERTA {item.descuento}%
															</div>
														)}
													<div className="flex gap-2 h-14  items-center">
														<Link href={`/producto/${item.slug}`}>
															<div className="w-12 relative h-14">
																<Image
																	src={item.imagenes[0]}
																	fill
																	className="object-cover"
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
													<div className="p-2">
														<BsTrash
															onClick={() => {
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
										{state.cart.length > 0 ? (
											<>
												<div className="text-sm mt-3 sm:text-base">
													<div className="border-y p-1">
														Total:{" "}
														<span className="font-bold font-sans">
															S/{" "}
															{state.cart
																.reduce(
																	(acc, item) =>
																		acc +
																		(item.descuento > 0 &&
																		verifyDiscount(item.fechaDescuento)
																			? item?.precio -
																			  (item?.precio * item?.descuento) / 100
																			: item.precio) *
																			item.cantidad,
																	0
																)
																.toFixed(2)}
														</span>
													</div>
													{state.cart.some((item) => item.descuento > 0) &&
														state.cart.some((item) =>
															verifyDiscount(item.fechaDescuento)
														) && (
															<div className="border-y p-1">
																Te ahorraste:{" "}
																<span className="font-bold text-primary font-sans">
																	S/{" "}
																	{(
																		+state.cart
																			.reduce(
																				(acc, item) =>
																					acc + item.precio * item.cantidad,
																				0
																			)
																			.toFixed(2) -
																		+state.cart
																			.reduce(
																				(acc, item) =>
																					acc +
																					(item?.precio -
																						(item?.precio * item?.descuento) /
																							100) *
																						item.cantidad,
																				0
																			)
																			.toFixed(2)
																	).toFixed(2)}
																</span>
															</div>
														)}
													<div className="border-b p-1">
														Envio:{" "}
														<span className="font-bold font-sans">
															Consultar
														</span>
													</div>
												</div>
												<div className="flex items-center mt-4 gap-2 justify-between text-sm">
													<button
														onClick={() => {
															dispatch({
																type: actionTypes.CLEAR_CART,
																payload: null,
															});
														}}
														className="border p-2"
													>
														Vacear
													</button>
													<Link
														onClick={() => {
															setLoading(true);
														}}
														href="/pasarela"
													>
														<button className="bg-gradient-to-r rounded-md from-primary/60 to-primary text-white font-bold p-2 w-24">
															{loading ? <LoadingSubmit /> : "Comprar"}
														</button>
													</Link>
												</div>
											</>
										) : (
											<p className="text-gray-500 text-sm text-center p-1">
												No hay productos en el carrito
											</p>
										)}
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default CartIcon;
