import { useState } from "react";
import { useFilter } from "@store/filterProducts";
import Product from "../Product";
import Pagination from "./Pagination";
import { motion } from "framer-motion";

function AllProducts() {
	const [page, setPage] = useState(1);
	const { state } = useFilter();

	return (
		<>
			<div className="flex w-full relative my-12 flex-wrap gap-4 items-center justify-center">
				{state.productsFiltered
					.slice((page - 1) * 8, page * 8)
					.map((product: any, index) => (
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							key={product.slug}
						>
							<Product product={product} />
						</motion.div>
					))}

				{state.productsFiltered.length === 0 && (
					<div className="text-center my-6">
						<h2 className="text-xl font-bold text-gray-800">
							No hay productos con su filtrado 😭
						</h2>
						<p className="text-sm">
							<span className="text-gray-600">Intenta con otro filtro</span>
						</p>
					</div>
				)}

				{state.productsFiltered.length > 8 && (
					<Pagination
						page={page}
						setPage={setPage}
						products={state.productsFiltered}
					/>
				)}
			</div>
		</>
	);
}

export default AllProducts;
