import React from "react";
import classNames from "classnames";

import { AiOutlineClose } from "react-icons/ai";
import Category from "./Categoria/";
import Color from "./Color";
import Brands from "./Marca";
import Prices from "./Precios";
import { IoFilterSharp } from "react-icons/io5";
import { useFilter, ActionTypeFilter } from "@store/filterProducts";
import ListFiltersApply from "./ListFiltersApply";

function Filter({ isOpen, setIsOpen, categorias, marcas }: any) {
	const cn = classNames("ModalFilter container-scroll text-sm font-bold", {
		ModalFilterActivate: isOpen,
	});
	const { state, dispatch } = useFilter();

	return (
		<div className={cn} role="dialog">
			<div className="flex items-center justify-between py-2  px-4 w-full">
				<div className="flex gap-2 items-center ">
					<IoFilterSharp className="h-6 w-6" />
					<h4>Filtros</h4>
				</div>
				<div className="lg:hidden" onClick={() => setIsOpen(false)}>
					<AiOutlineClose className="h-6 w-6" />
				</div>
			</div>

			<ListFiltersApply />

			<Category
				countFilters={state.categories.length + state.subcategories.length}
				categorias={categorias}
			/>
			<Color countFilters={state.colors.length} />
			<Brands countFilters={state.brands.length} marcas={marcas} />
			<Prices />

			{(state.brands.length > 0 ||
				state.categories.length > 0 ||
				state.colors.length > 0 ||
				state.subcategories.length > 0 ||
				state.maxPrice ||
				state.minPrice) && (
				<button
					onClick={() => {
						dispatch({
							payload: "",
							type: ActionTypeFilter.REMOVE_ALL_FILTERS,
						});
					}}
					className="w-full mt-3 px-4 py-2 text-sm border btn"
				>
					Remover filtros
				</button>
			)}
		</div>
	);
}

export default Filter;
