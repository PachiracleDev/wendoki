import React from "react";

function ButtonEnter({
	value,
	onClick,

	className,
}: {
	value: string;
	onClick?: () => void;

	className?: string;
}) {
	return (
		<button
			onClick={onClick}
			className={`text-white text-sm w-full rounded-md font-bold p-2 bg-gradient-to-r from-blue-500 to-pink-500 via-violet-500 ${
				className || ""
			}`}
		>
			{value}
		</button>
	);
}

export default ButtonEnter;
