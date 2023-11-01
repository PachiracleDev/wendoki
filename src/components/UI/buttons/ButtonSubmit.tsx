import React from "react";
import LoadingSubmit from "../loadings/LoadingSubmit";

function ButtonSubmit({
	text,
	loading,
	classList = "",
	onClick,
}: {
	text: string;
	loading: boolean;

	classList?: string;
	onClick?: () => void;
}) {
	return (
		<button
			type="submit"
			onClick={onClick}
			disabled={loading}
			className={`flex justify-center rounded-md cursor-pointer items-center w-full text-white font-bold p-3 bg-gradient-to-r from-blue-500 to-pink-500 via-violet-500 ${
				classList ? classList : ""
			}`}
		>
			{loading ? <LoadingSubmit /> : text}
		</button>
	);
}

export default ButtonSubmit;
