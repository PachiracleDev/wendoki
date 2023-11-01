import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { actionTypes, useCartStore } from "@store/cartshopping";
import { useSnackbar } from "notistack";
import { getColorTailwind } from "@utils/getColorTailwind";
import { BsCartPlusFill } from "react-icons/bs";
import { Autoplay, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { verifyDiscount } from "@utils/verifyDiscount";
import { Product } from "models/Product";
function Product({ product }: { product: Product }) {
	const { dispatch, state } = useCartStore();
	const { enqueueSnackbar } = useSnackbar();

	const addToCart = (product: Product) => {
		if (product.stock <= 0) {
			enqueueSnackbar("No hay stock disponible", {
				variant: "warning",
				autoHideDuration: 2000,
			});
			return;
		}
		const exist = state.cart.find((p) => p.slug === product.slug);
		if (exist && exist.cantidad >= product.stock) {
			enqueueSnackbar(
				`No hay stock disponible, solo hay disponibles: ${product.stock} u`,
				{
					variant: "warning",
					autoHideDuration: 2000,
				}
			);
			return;
		}

		const newProduct = {
			...product,
			cantidad: exist ? exist.cantidad + 1 : 1,
		};
		dispatch({
			type: actionTypes.ADD_TO_CART,
			payload: newProduct,
		});
		enqueueSnackbar("Producto agregado al carrito", {
			variant: "success",
			autoHideDuration: 1000,
		});
	};

	return (
		<div className=" hover:shadow-md duration-300">
			<div className="relative w-64 h-72 overflow-hidden">
				<Link href={`/producto/${product.slug}`}>
					<Swiper
						modules={[Scrollbar, A11y, Autoplay]}
						spaceBetween={0}
						slidesPerView={1}
						autoplay={{ delay: 2500 }}
					>
						{product.imagenes.map((imagen, index) => (
							<SwiperSlide key={imagen}>
								<div className="relative w-64 h-72">
									<Image
										fill
										alt="Product"
										className="hover:scale-110 duration-500 object-cover object-center"
										src={imagen}
									/>
									{product.descuento > 0 &&
										verifyDiscount(product.fechaDescuento) && (
											<div className="bg-red-500 text-white font-bold rounded-md px-3 py-2 absolute top-2 right-2 text-xs">
												OFERTA {product.descuento}%
											</div>
										)}
									{product.destacado === "TRUE" && (
										<div className="bg-primary text-white font-bold rounded-md px-3 py-2 absolute bottom-2 left-2 text-xs">
											DESTACADO
										</div>
									)}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</Link>
			</div>
			<div className="flex flex-col p-1 gap-1">
				<div className="flex flex-col capitalize">
					<span className="font-bold text-gray-500 text-sm whitespace-nowrap max-w-[220px] leading-6">
						{product.marca?.toUpperCase()}
					</span>
					<span className="font-bold  whitespace-nowrap max-w-[220px]">
						{product?.nombre}
					</span>
					<div className="flex gap-2 items-center">
						<span className="font-medium text-sm  whitespace-nowrap max-w-[220px]">
							{product?.categoria}{" "}
							{product?.subcategoria && `- ${product?.subcategoria}`}
						</span>
						{product.color && (
							<div
								className={`border rounded-full p-2 w-2 h-2 ${getColorTailwind(
									product.color.toLowerCase()
								)}`}
							/>
						)}
					</div>
				</div>
				<div className="flex justify-between p-1 text-sm items-center">
					<span className=" italic font-bold text-primary px-2 pb-1 font-sans leading-3  ">
						{product.descuento > 0 && verifyDiscount(product.fechaDescuento) ? (
							<div className="flex gap-1 items-center">
								<span className="line-through text-gray-500">
									S/{product?.precio}
								</span>
								<span className="text-primary">
									S/
									{(
										product?.precio -
										(product?.precio * product?.descuento) / 100
									).toFixed(2)}
								</span>
							</div>
						) : (
							`S/${product?.precio}`
						)}
					</span>
					<button
						onClick={() => addToCart(product)}
						className="bg-primary hover:opacity-50 text-white rounded-full p-2"
					>
						<BsCartPlusFill size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default memo(Product);
