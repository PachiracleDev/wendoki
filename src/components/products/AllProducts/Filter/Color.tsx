import { useState } from "react";
import { BsCheck2Circle, BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";

import { useFilter, ActionTypeFilter } from "@store/filterProducts";

function Color({ countFilters }: { countFilters: number }) {
	const { dispatch, state } = useFilter();
	const [isOpen, setIsOpen] = useState(false);
	const handleColor = (color: string) => {
		const existColorInFilter = state.colors.includes(color);
		dispatch({
			type: ActionTypeFilter.HANDLE_FILTER,
			payload: {
				...state,
				colors: existColorInFilter
					? state.colors.filter((c) => c !== color)
					: [...state.colors, color],
			},
		});
	};

	return (
		<div className="w-full border-b">
			<div
				onClick={() => setIsOpen(!isOpen)}
				className=" gap-2 cursor-pointer hover:text-black flex justify-between px-4 pb-2  items-center  my-4"
			>
				<div className="flex gap-2 items-center">
					COLOR
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
				className="text-lg"
			>
				<div className="p-2 flex flex-wrap gap-7 justify-center items-center ">
					<div onClick={() => handleColor("rojo")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-red-500">
							{state.colors.includes("rojo") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Rojo</span>
						</div>
					</div>
					<div onClick={() => handleColor("azul")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-blue-500">
							{state.colors.includes("azul") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Azul</span>
						</div>
					</div>
					<div
						onClick={() => handleColor("amarillo")}
						className="cursor-pointer"
					>
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-yellow-500">
							{state.colors.includes("amarillo") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Amarillo</span>
						</div>
					</div>
					<div onClick={() => handleColor("verde")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-green-500">
							{state.colors.includes("verde") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Verde</span>
						</div>
					</div>
					<div
						onClick={() => handleColor("anaranjado")}
						className="cursor-pointer"
					>
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-orange-500">
							{state.colors.includes("anaranjado") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Anaranjado</span>
						</div>
					</div>
					<div onClick={() => handleColor("rosado")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-pink-500">
							{state.colors.includes("rosado") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Rosado</span>
						</div>
					</div>
					<div onClick={() => handleColor("morado")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-violet-500">
							{state.colors.includes("morado") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Morado</span>
						</div>
					</div>
					<div onClick={() => handleColor("marron")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-amber-800">
							{state.colors.includes("marron") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Marrón</span>
						</div>
					</div>
					<div onClick={() => handleColor("blanco")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md border">
							{state.colors.includes("blanco") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-black" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Blanco</span>
						</div>
					</div>
					<div onClick={() => handleColor("gris")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md border bg-gray-500">
							{state.colors.includes("gris") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Gris</span>
						</div>
					</div>
					<div onClick={() => handleColor("negro")} className="cursor-pointer">
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-black">
							{state.colors.includes("negro") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Negro</span>
						</div>
					</div>
					<div
						onClick={() => handleColor("multicolor")}
						className="cursor-pointer"
					>
						<div className="w-6 h-6 mx-auto relative rounded-full shadow-md bg-gradient-to-br from-red-500 via-green-500 to-blue-500">
							{state.colors.includes("multicolor") && (
								<BsCheck2Circle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
							)}
						</div>
						<div className="flex flex-col gap-1 items-center justify-center text-sm">
							<span>Multicolor</span>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default Color;
