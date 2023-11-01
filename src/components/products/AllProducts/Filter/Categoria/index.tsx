import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import One from "./One";

type CategoriaObjectType = {
	nombre: string;
	subcategorias: string[];
}[];

function Categoria({
	categorias,
	countFilters,
}: {
	categorias: CategoriaObjectType;
	countFilters: number;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="w-full border-b">
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="gap-2 cursor-pointer hover:text-black flex justify-between px-4 pb-2  items-center   my-4"
			>
				<div className="flex gap-2 items-center">
					CATEGORIA
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
				<div className="p-2 flex flex-col gap-4 ">
					{categorias.map((categoria) => (
						<One
							key={categoria.nombre}
							nombre={categoria.nombre}
							subcategorias={categoria.subcategorias}
						/>
					))}
				</div>
			</motion.div>
		</div>
	);
}

export default Categoria;
