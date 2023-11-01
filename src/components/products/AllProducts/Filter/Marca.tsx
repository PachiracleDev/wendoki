import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import { AiOutlineRight } from "react-icons/ai";

import { useFilter, ActionTypeFilter } from "@store/filterProducts";

function Marca({
	marcas,
	countFilters,
}: {
	marcas: string[];
	countFilters: number;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { dispatch, state } = useFilter();

	const handleMarca = (marca: string) => {
		const existMarcaInFilter = state.brands.includes(marca);
		dispatch({
			type: ActionTypeFilter.HANDLE_FILTER,
			payload: {
				...state,
				brands: existMarcaInFilter
					? state.brands.filter((c) => c !== marca)
					: [...state.brands, marca],
			},
		});
	};

	return (
		<div className="w-full border-b">
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="  gap-2 cursor-pointer hover:text-black flex justify-between px-4 pb-2  items-center   my-4"
			>
				<div className="flex gap-2 items-center">
					MARCA
					{countFilters > 0 && (
						<span className="bg-gray-300 rounded-full font-sans px-1.5 py-1 leading-3 text-xs">
							{countFilters}
						</span>
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
			>
				<div className="flex flex-col gap-4 p-2">
					{marcas.map((marca) => (
						<div
							key={marca}
							onClick={() => {
								handleMarca(marca);
							}}
							className={`flex gap-2 cursor-pointer  items-center p-2 w-full rounded-md ${
								state.brands.includes(marca) &&
								"text-white bg-primary hover:opacity-50 transition-opacity duration-500"
							}`}
						>
							<AiOutlineRight className="h-4 w-4" />
							{marca.toUpperCase()}
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
}

export default Marca;
