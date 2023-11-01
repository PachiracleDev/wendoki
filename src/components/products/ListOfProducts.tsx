import React from "react";
import Product from "./Product";
import { Product as ProductInterface } from "models/Product";
import { motion } from "framer-motion";

function ListOfProducts({
	products,
	title,
	description,
}: {
	title: string;
	description: string;
	products: ProductInterface[];
}) {
	return (
		<div className="my-4 p-2 md: px-12 lg:px-32">
			<h3 className="font-bold leading-10 text-xl lg:text-3xl">
				{title}
				<div className="bg-gradient-to-r from-primary/60 to-primary h-1 w-10 rounded-full" />
			</h3>
			<p className="text-gray-500 text-sm p-2">{description}</p>
			<div className="flex gap-6 justify-center items-center flex-wrap mt-3">
				{products.map((product, index) => (
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
			</div>
		</div>
	);
}

export default ListOfProducts;
