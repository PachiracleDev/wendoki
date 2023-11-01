import { useFilter, ActionTypeFilter } from "@store/filterProducts";
import { getColorTailwind } from "@utils/getColorTailwind";
import React from "react";
import { HiXMark } from "react-icons/hi2";

function ListFiltersApply() {
	const { state, dispatch } = useFilter();

	const handleRemoveFilter = (type: string, value: string | null) => {
		dispatch({
			type: ActionTypeFilter.REMOVE_ONE_FILTER,
			payload: {
				type,
				value,
			},
		});
	};

	return (
		<div className="flex gap-3 flex-wrap">
			{state.brands.map((brand, index) => (
				<div
					key={brand + index}
					className="text-xs font-medium flex items-center gap-2  border-2  text-gray-500 rounded-md p-2"
				>
					<div>
						Marca: <span className="font-bold capitalize">{brand}</span>
					</div>
					<HiXMark
						onClick={() => handleRemoveFilter("brands", brand)}
						className="cursor-pointer hover:opacity-60"
						size={20}
					/>
				</div>
			))}
			{state.categories.map((category, index) => (
				<div
					key={category + index}
					className="text-xs font-medium flex items-center gap-2  border-2  text-gray-500 rounded-md p-2"
				>
					<div>
						Categoria: <span className="font-bold capitalize">{category}</span>
					</div>
					<HiXMark
						onClick={() => handleRemoveFilter("categories", category)}
						className="cursor-pointer hover:opacity-60"
						size={20}
					/>
				</div>
			))}
			{state.subcategories.map((subcategoria, index) => (
				<div
					key={subcategoria + index}
					className="text-xs font-medium flex items-center gap-2  border-2  text-gray-500 rounded-md p-2"
				>
					<div>
						Subcategoria:{" "}
						<span className="font-bold capitalize">{subcategoria}</span>
					</div>
					<HiXMark
						onClick={() => handleRemoveFilter("subcategories", subcategoria)}
						className="cursor-pointer hover:opacity-60"
						size={20}
					/>
				</div>
			))}
			{state.colors.map((color, index) => (
				<div
					key={color + index}
					className="text-xs font-medium flex items-center gap-2  border-2  text-gray-500 rounded-md p-2"
				>
					<div className="flex gap-1 items-center">
						Color:{" "}
						<div
							className={`border rounded-full p-2 w-2 h-2 ${getColorTailwind(
								color.toLowerCase()
							)}`}
						/>
					</div>
					<HiXMark
						onClick={() => handleRemoveFilter("colors", color)}
						className="cursor-pointer hover:opacity-60"
						size={20}
					/>
				</div>
			))}
		</div>
	);
}

export default ListFiltersApply;
