import Layout from "@layout/index";
import Link from "next/link";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

function PageNotFound() {
	return (
		<Layout>
			<div className="flex max-w-5xl justify-center my-4 lg:my-52 flex-col items-center mx-auto gap-4">
				<MdErrorOutline size={150} className="text-red-500" />
				<p className="text-gray-500">Página no encontrada</p>
				<Link href="/" className="btn px-4 py-2 text-sm">
					Volver al inicio
				</Link>
			</div>
		</Layout>
	);
}

export default PageNotFound;
