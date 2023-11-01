import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WspIcon() {
	return (
		<Link
			target="_blank"
			href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&text=Hola,%20me%20gustaría%20saber%20más%20sobre%20sus%20productos.`}
		>
			<div className="bg-gradient-to-r z-10 from-green-400 to-green-500 shadow-md text-white p-2 rounded-full">
				<FaWhatsapp size={29} />
			</div>
		</Link>
	);
}

export default WspIcon;
