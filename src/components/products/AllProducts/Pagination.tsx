import { Product } from "models/Product";
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Pagination({
	products,
	page,
	setPage,
}: {
	products: Product[];
	page: number;
	setPage: Function;
}) {
	const pages = Math.ceil(products.length / 8);

	const handleClick = (page: number) => {
		setPage(page);
	};

	const start = (page - 1) * 8;

	const pageButtons = [];
	for (let i = 1; i <= pages; i++) {
		pageButtons.push(
			<button
				className={`bg-gray-200 font-sans rounded-full px-3 py-2 text-xs ${
					page === i ? "bg-primary text-white" : ""
				}`}
				key={i}
				onClick={(e) => handleClick(i)}
			>
				{i}
			</button>
		);
	}

	return (
		<>
			<div className="absolute right-12 lg:right-48 flex gap-2 items-center bottom-[-60px]">
				{page > 1 && (
					<button
						className="text-gray-500"
						onClick={() => handleClick(page - 1)}
					>
						<AiOutlineLeft size={20} />
					</button>
				)}
				{pageButtons}
				{page < pages && (
					<button
						className="text-gray-500"
						onClick={() => handleClick(page + 1)}
					>
						<AiOutlineRight size={20} />
					</button>
				)}
			</div>
		</>
	);
}

export default Pagination;
