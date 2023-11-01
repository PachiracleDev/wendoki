import { ProductCart } from "models/Product";
import { useState } from "react";

function DiscountQuantity({
	quantityInitial,
	max,
	setProductos,
	slug,
	setActivateButton,
}: {
	quantityInitial: number;
	max: number;
	slug: string;
	setActivateButton: React.Dispatch<React.SetStateAction<boolean>>;
	setProductos: React.Dispatch<React.SetStateAction<ProductCart[]>>;
}) {
	const [quantity, setQuantity] = useState(0);
	return (
		<>
			<p className="text-gray-500 text-xs mt-3">
				Eliga la cantidad que desea comprar
			</p>
			<div className="flex mt-1">
				<button
					onClick={() => {
						if (quantity <= 1) {
							return;
						}
						setQuantity(quantity - 1);
					}}
					className="border rounded-l-md py-2 px-4 font-bold bg-gray-200"
				>
					-
				</button>
				<input
					className="w-10 border text-center"
					type="number"
					//Cuando deje de escribir en el input, se ejecuta la funcion
					onBlur={(e) => {
						if (parseInt(e.target.value) >= max) {
							setQuantity(max);
						}
					}}
					onChange={(e) => setQuantity(parseInt(e.target.value))}
					value={quantity}
				/>
				<button
					onClick={() => {
						if (quantity >= max) {
							return;
						}
						setQuantity(quantity + 1);
					}}
					className="border rounded-r-md py-2 px-4 font-bold bg-gray-200"
				>
					+
				</button>
				{quantity !== 0 && quantity !== quantityInitial && (
					<button
						className="bg-gradient-to-r from-primary/60 to-primary text-white p-2 rounded-md  ml-2 text-xs"
						onClick={() => {
							setProductos((prev) => {
								return prev.map((item) => {
									if (item.slug === slug) {
										return {
											...item,
											cantidad: quantity,
										};
									}
									return item;
								});
							});
							setActivateButton(true);
						}}
					>
						Guardar
					</button>
				)}
			</div>
		</>
	);
}

export default DiscountQuantity;
