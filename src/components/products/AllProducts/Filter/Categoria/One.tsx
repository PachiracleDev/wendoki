import { useState } from "react";
import { motion } from "framer-motion";
import { BsChevronDown } from "react-icons/bs";

import { AiOutlineRight } from "react-icons/ai";
import { useFilter, ActionTypeFilter } from "@store/filterProducts";

function One({
	nombre,
	subcategorias,
}: {
	nombre: string;
	subcategorias: any;
}) {
	const [open, setOpen] = useState(false);
	const { dispatch, state } = useFilter();

	const handleCategory = (categoryName: string) => {
		const existCategoryInFilter = state.categories.includes(categoryName);

		dispatch({
			type: ActionTypeFilter.HANDLE_FILTER,
			payload: {
				...state,
				categories: existCategoryInFilter
					? state.categories.filter((c) => c !== categoryName)
					: [...state.categories, categoryName],
			},
		});
	};
	const handleSubcategory = (subcategoryName: string) => {
		const existCategoryInFilter = state.subcategories.includes(subcategoryName);

		dispatch({
			type: ActionTypeFilter.HANDLE_FILTER,
			payload: {
				...state,
				subcategories: existCategoryInFilter
					? state.subcategories.filter((c) => c !== subcategoryName)
					: [...state.subcategories, subcategoryName],
			},
		});
	};

	return (
		<div>
			<div
				onClick={() => {
					if (subcategorias.length > 0) {
						setOpen(!open);
					} else {
						handleCategory(nombre);
					}
				}}
				className="flex items-center justify-between cursor-pointer hover:text-black"
			>
				<div
					className={`flex capitalize gap-2 items-center p-2 w-full rounded-md ${
						state.categories.includes(nombre) &&
						"text-white bg-primary hover:opacity-50 transition-opacity duration-500"
					}`}
				>
					<AiOutlineRight className="h-4 w-4" />
					{nombre.toUpperCase()}
				</div>
				{subcategorias.length > 0 && (
					<div className="flex items-center px-4">
						<BsChevronDown
							className={`h-4 w-4 duration-500  ${
								open && "transform rotate-180"
							}`}
						/>
					</div>
				)}
			</div>

			{subcategorias.length > 0 && (
				<motion.div
					initial={{ height: 0, overflow: "hidden" }}
					animate={{
						height: open ? "auto" : 0,
						overflow: "hidden",
					}}
					transition={{ duration: 0.5 }}
					className="flex flex-col pl-4"
				>
					<div className="p-2 flex flex-col gap-4">
						{subcategorias.map((subcategoria: string) => (
							<div
								key={subcategoria}
								onClick={() => handleSubcategory(subcategoria)}
								className={`flex gap-2   items-center cursor-pointer p-2  ${
									state.subcategories.includes(subcategoria) &&
									"text-white bg-primary hover:opacity-50 transition-opacity duration-500"
								}`}
							>
								<AiOutlineRight className="h-4 w-4" />
								{subcategoria.toUpperCase()}
							</div>
						))}
					</div>
				</motion.div>
			)}
		</div>
	);
}

export default One;
