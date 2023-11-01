import { verifyDiscount } from "@utils/verifyDiscount";
import { Product } from "models/Product";
import { createContext, useContext, useReducer } from "react";
type StateFilter = {
	initialProducts: Product[];
	categories: string[];
	brands: string[];
	colors: string[];
	subcategories: string[];
	minPrice: number | null;
	maxPrice: number | null;
	productsFiltered: Product[];
};

enum ActionTypeFilter {
	HANDLE_FILTER = "HANDLE_FILTER",
	ORDER_BY = "ORDER_BY",
	REMOVE_ONE_FILTER = "REMOVE_ONE_FILTER",
	REMOVE_ALL_FILTERS = "REMOVE_ALL_FILTERS",
}

type Action = {
	type: ActionTypeFilter;
	payload: any;
};

const initialState: Omit<StateFilter, "initialProducts"> = {
	categories: [],
	subcategories: [],
	brands: [],
	colors: [],
	minPrice: null,
	maxPrice: null,
	productsFiltered: [],
};

type TypeContext = {
	state: StateFilter & Omit<StateFilter, "initialProducts">;
	dispatch: React.Dispatch<Action>;
};

const FilterContext = createContext<TypeContext>({
	state: {
		...initialState,
		initialProducts: [],
	},
	dispatch: () => null,
});

const reducer = (state: StateFilter, action: Action): StateFilter => {
	switch (action.type) {
		case ActionTypeFilter.HANDLE_FILTER:
			const { payload } = action;
			const productsFiltered = payload.initialProducts.filter(
				(product: Product) => {
					const existCategoryInFilter = payload.categories.includes(
						product.categoria
					);
					const existSubcategoryInFilter = payload.subcategories.includes(
						product.subcategoria
					);
					const existBrandInFilter = payload.brands.includes(product.marca);
					const existColorInFilter = payload.colors.includes(product.color);

					const verdaderoPrecio = product.descuento
						? +(
								product?.precio -
								(product?.precio * product?.descuento) / 100
						  ).toFixed(2)
						: +product.precio;

					const existPriceInFilter =
						verdaderoPrecio >= payload.minPrice! &&
						verdaderoPrecio <= payload.maxPrice!;

					return (
						(existCategoryInFilter || payload.categories.length === 0) &&
						(existSubcategoryInFilter || payload.subcategories.length === 0) &&
						(existBrandInFilter || payload.brands.length === 0) &&
						(existColorInFilter || payload.colors.length === 0) &&
						(existPriceInFilter ||
							payload.minPrice === null ||
							payload.maxPrice === null)
					);
				}
			);

			return {
				...payload,
				productsFiltered,
			};

		case ActionTypeFilter.ORDER_BY:
			const { payload: orderBy } = action;

			if (orderBy === "price-asc") {
				return {
					...state,
					productsFiltered: state.productsFiltered.sort(
						(a, b) => a.precio - b.precio
					),
				};
			}

			if (orderBy === "price-desc") {
				return {
					...state,
					productsFiltered: state.productsFiltered.sort(
						(a, b) => b.precio - a.precio
					),
				};
			}

			if (orderBy === "name-asc") {
				return {
					...state,
					productsFiltered: state.productsFiltered.sort((a, b) =>
						a.nombre.localeCompare(b.nombre)
					),
				};
			}

			if (orderBy === "name-desc") {
				return {
					...state,
					productsFiltered: state.productsFiltered.sort((a, b) =>
						b.nombre.localeCompare(a.nombre)
					),
				};
			}

			if (orderBy === "featured") {
				const featuredProducts = state.productsFiltered.filter(
					(product) =>
						product.destacado === "TRUE" || product.destacado === "VERDADERO"
				);
				const nonFeaturedProducts = state.productsFiltered.filter(
					(product) =>
						product.destacado === "FALSE" || product.destacado === "FALSO"
				);
				return {
					...state,
					productsFiltered: [...featuredProducts, ...nonFeaturedProducts],
				};
			}

			if (orderBy === "oferts") {
				const ofertsProducts = state.productsFiltered.filter(
					(product) => product.descuento
				);
				const nonOfertsProducts = state.productsFiltered.filter(
					(product) => !product.descuento
				);
				return {
					...state,
					productsFiltered: [...ofertsProducts, ...nonOfertsProducts],
				};
			}

			return state;

		case ActionTypeFilter.REMOVE_ONE_FILTER:
			const { payload: payloadRemove } = action;
			const { type, value } = payloadRemove;
			const allTypes = [
				"categories",
				"subcategories",
				"brands",
				"colors",
				"minPrice",
				"maxPrice",
			];
			if (allTypes.includes(type)) {
				const newState = {
					...state,
					[type]: state[
						type as "categories" | "subcategories" | "brands" | "colors"
					].filter((val) => val !== value),
				};
				return reducer(newState, {
					type: ActionTypeFilter.HANDLE_FILTER,
					payload: newState,
				});
			}

		case ActionTypeFilter.REMOVE_ALL_FILTERS:
			return {
				...state,
				categories: [],
				subcategories: [],
				brands: [],
				colors: [],
				minPrice: null,
				maxPrice: null,
				productsFiltered: state.initialProducts,
			};

		default:
			return state;
	}
};

const FilterProvider = ({
	children,
	initialProducts,
}: {
	initialProducts: Product[];
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(reducer, {
		...initialState,
		initialProducts,
		productsFiltered: initialProducts,
	});
	return (
		<FilterContext.Provider value={{ state, dispatch }}>
			{children}
		</FilterContext.Provider>
	);
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter, ActionTypeFilter };
