import { useState } from "react";
import { BsCheck2Circle, BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { ActionTypeFilter, useFilter } from "@store/filterProducts";

function Precios() {
	const [isOpen, setIsOpen] = useState(false);
	const [priceMin, setPriceMin] = useState("");
	const [priceMax, setPriceMax] = useState("");
	const { dispatch, state } = useFilter();
	const { enqueueSnackbar } = useSnackbar();

	const handlePrice = () => {
		if (typeof +priceMin !== "number" || typeof +priceMax !== "number") {
			enqueueSnackbar("El precio debe ser un numero", {
				variant: "error",
			});
			return;
		}

		if (+priceMax < +priceMin) {
			enqueueSnackbar("El precio maximo no puede ser menor que el minimo", {
				variant: "error",
			});
			return;
		}

		if (+priceMin === 0 && +priceMax === 0) {
			enqueueSnackbar("No se ha cambiado el precio", {
				variant: "error",
			});
			return;
		}
		dispatch({
			type: ActionTypeFilter.HANDLE_FILTER,
			payload: {
				...state,
				minPrice: priceMin,
				maxPrice: priceMax,
			},
		});
	};

	return (
		<div className="w-full border-b">
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="  gap-2 cursor-pointer hover:text-black flex justify-between px-4 pb-2  items-center   my-4"
			>
				<div className="flex gap-3 items-center">
					PRECIO
					{state.minPrice && state.maxPrice && (
						<p className="font-bold bg-gray-200 p-1 rounded-md text-xs text-gray-500 font-sans">
							Min: {state.minPrice} - Max: {state.maxPrice}
						</p>
					)}
				</div>
				<BsChevronDown
					className={`h-5 w-5 duration-500  ${
						isOpen && "transform rotate-180"
					}`}
				/>
			</div>

			<motion.div
				initial={{ height: 0, overflow: "hidden" }}
				animate={{ height: isOpen ? "auto" : 0, overflow: "hidden" }}
				transition={{ duration: 0.5 }}
				className="flex flex-col gap-4 text-lg  "
			>
				<div className="flex gap-2 p-2 justify-center items-center">
					<div className="w-1/4 ">
						<span className="text-xs">Min</span>
						<input
							type="number"
							className="border w-full block border-gray-100 shadow font-sans rounded-md p-2"
							value={priceMin}
							onChange={(e) => setPriceMin(e.target.value)}
						/>
					</div>
					<span className="mt-5">-</span>
					<div className="w-1/4 ">
						<span className="text-xs">Max</span>
						<input
							type="number"
							className="w-full block border border-gray-100 shadow font-sans rounded-md p-2"
							value={priceMax}
							onChange={(e) => setPriceMax(e.target.value)}
						/>
					</div>
					<button
						onClick={handlePrice}
						className="rounded-md h-12 text-xs mt-7 cursor-pointer py-2 px-4 btn"
					>
						Aplicar
					</button>
				</div>
			</motion.div>
		</div>
	);
}

export default Precios;
