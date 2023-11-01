import { useState } from "react";
import { useSnackbar } from "notistack";
import { actionTypes, useCartStore } from "@store/cartshopping";
import { Product } from "models/Product";

function AddToCart({ product }: { product: Product }) {
	const [quantity, setQuantity] = useState(1);
	const { enqueueSnackbar } = useSnackbar();
	const { dispatch, state } = useCartStore();
	const addToCart = () => {
		if (!quantity) return;
		if (quantity > product.stock) {
			enqueueSnackbar("No hay suficiente stock", {
				variant: "warning",
				autoHideDuration: 2000,
			});
			return;
		}
		const quantityInCart = state.cart.find(
			(item) => item.slug === product.slug
		);
		const verifyStock = quantityInCart
			? quantityInCart.cantidad + quantity
			: quantity;

		if (verifyStock > product.stock) {
			enqueueSnackbar("No hay suficiente stock", {
				variant: "warning",
				autoHideDuration: 2000,
			});
			return;
		}

		dispatch({
			type: actionTypes.ADD_TO_CART,
			payload: {
				...product,
				cantidad: verifyStock,
			},
		});
		enqueueSnackbar("Producto agregado al carrito", {
			variant: "success",
			autoHideDuration: 2000,
		});
	};

	return (
		<div className="flex items-center gap-2">
			<input
				type="number"
				onBlur={(e) => {
					if (parseInt(e.target.value) >= product.stock) {
						setQuantity(product.stock);
					}
				}}
				value={quantity}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
				className="w-24 font-sans outline-none focus:border-primary/60 h-10 border rounded-md text-center"
			/>
			<button className="btn px-4 py-2" onClick={addToCart}>
				Agregar al carrito
			</button>
		</div>
	);
}

export default AddToCart;
