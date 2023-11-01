import { useReducer, useContext, createContext } from "react";
import Cookies from "js-cookie";
import { ProductCart } from "models/Product";
type StateT = {
	cart: ProductCart[];
};

enum actionTypes {
	ADD_TO_CART = "ADD_TO_CART",
	REMOVE_FROM_CART = "REMOVE_FROM_CART",
	CLEAR_CART = "CLEAR_CART",
}

type Action = {
	type: string;
	payload: any;
};
const initialState: StateT = {
	cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [],
};

type TypeContext = {
	state: StateT;
	dispatch: React.Dispatch<Action>;
};

const CartStoreContext = createContext<TypeContext>({
	state: initialState,
	dispatch: () => null,
});

const reducer = (state: StateT, action: Action): StateT => {
	switch (action.type) {
		case "ADD_TO_CART":
			const newItem = action.payload as ProductCart;
			const existItem = state.cart.find((x) => x.slug === newItem.slug);
			const cartItems = existItem
				? state.cart.map((x) => (x.slug === newItem.slug ? newItem : x))
				: [...state.cart, newItem];

			Cookies.set("cart", JSON.stringify(cartItems));
			return { ...state, cart: cartItems };

		case "REMOVE_FROM_CART":
			const removeItem = action.payload as ProductCart;
			const newCartItems = state.cart.filter((x) => x.slug !== removeItem.slug);
			Cookies.set("cart", JSON.stringify(newCartItems));
			return { ...state, cart: newCartItems };

		case "CLEAR_CART":
			Cookies.remove("cart");
			return { ...state, cart: [] };

		default:
			return state;
	}
};

const CartStoreProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<CartStoreContext.Provider value={{ state, dispatch }}>
			{children}
		</CartStoreContext.Provider>
	);
};

const useCartStore = () => useContext(CartStoreContext);

export { CartStoreProvider, useCartStore, actionTypes };
