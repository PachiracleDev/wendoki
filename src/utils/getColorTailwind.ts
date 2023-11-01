export const getColorTailwind = (color: string) => {
	switch (color) {
		case "azul":
			return "bg-blue-500";

		case "rojo":
			return "bg-red-500";

		case "verde":
			return "bg-green-500";

		case "amarillo":
			return "bg-yellow-500";

		case "anaranjado":
			return "bg-orange-500";

		case "rosado":
			return "bg-pink-500";

		case "morado":
			return "bg-purple-500";

		case "gris":
			return "bg-gray-500";

		case "blanco":
			return "bg-white";

		case "negro":
			return "bg-black";

		case "marron":
			return "bg-amber-800";

		case "blanco":
			return "bg-white";

		case "multicolor":
			return "bg-gradient-to-br from-red-500 via-green-500 to-blue-500";

		default:
			return "bg-gray-500";
	}
};
