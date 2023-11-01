import { useState } from "react";

import { BsSearch } from "react-icons/bs";
import AnimacionBuscador from "./AnimacionBuscador";
import { useFilter } from "@store/filterProducts";
import Image from "next/image";
import { Product } from "models/Product";
import Link from "next/link";
import { MdOutlineKeyboardVoice } from "react-icons/md";

function Buscador() {
	const { state } = useFilter();
	const [search, setSearch] = useState("");
	const [list, setList] = useState<Product[]>([]);

	const [isVoice, setIsVoice] = useState(false);

	const handleSearch = (value: string) => {
		setSearch(value);
		if (search.length > 0) {
			setList(
				state.initialProducts
					.filter((product) =>
						product.nombre.toLowerCase().includes(value.toLowerCase())
					)
					.slice(0, 8)
			);
		}
	};

	const handleHearVoice = () => {
		setIsVoice(!isVoice);
		const recognition = new webkitSpeechRecognition();
		setIsVoice(true);
		recognition.lang = "es-ES";
		recognition.continuous = false;
		recognition.start();

		setTimeout(() => {
			recognition.onresult = (event) => {
				const result = event.results[0][0].transcript;
				setSearch(result);
				setList(
					state.initialProducts
						.filter((product) =>
							product.nombre.toLowerCase().includes(result.toLowerCase())
						)
						.slice(0, 8)
				);
			};
			recognition.stop();
			setIsVoice(false);
		}, 2000);
	};

	return (
		<div className="bg-white border-b shadow-md z-40 fixed w-full top-14 lg:top-12 xl:top-16 lg:p-4 p-3">
			<div className="relative lg:border-r-2 lg:max-w-xs">
				<BsSearch size={17} className="absolute top-1 left-0" />
				{search.length === 0 && (
					<label className="absolute flex pointer-events-none gap-1 items-center top-0.5 text-gray-500 text-sm left-8">
						Buscar <AnimacionBuscador />
					</label>
				)}
				<input
					value={search}
					onChange={(e) => handleSearch(e.target.value)}
					type="text"
					className="px-8 w-full"
				/>
				<MdOutlineKeyboardVoice
					onClick={handleHearVoice}
					className={`absolute h-5 w-5 top-0 right-3 cursor-pointer ${
						isVoice ? "text-primary" : "text-gray-500"
					}`}
				/>
			</div>
			{search.length > 0 && (
				<>
					<div className="my-1 border-t w-full">
						{list.length === 0 ? (
							<p className="text-sm text-gray-500 pt-4">
								No se encontraron resultados
							</p>
						) : (
							<ul className="flex flex-wrap items-center gap-3 lg:gap-5 pt-4">
								{list.map((item) => (
									<Link
										className="hover:scale-105 duration-300"
										href={`/producto/${item.slug}`}
										key={item.slug}
									>
										<li className="flex gap-2 items-center">
											<div className="relative h-8 w-8">
												<Image
													src={item.imagenes[0]}
													alt={item.nombre}
													fill
													className="rounded-full"
												/>
											</div>
											<div className="flex flex-col">
												<p
													className="text-sm font-medium text-gray-900"
													dangerouslySetInnerHTML={{
														__html: item.nombre.replace(
															new RegExp(search, "gi"),
															"<b class='text-primary'>$&</b>"
														),
													}}
												/>
												<span className="font-bold text-xs text-gray-500">
													{item.marca.toUpperCase()}
												</span>
											</div>
										</li>
									</Link>
								))}
							</ul>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Buscador;
