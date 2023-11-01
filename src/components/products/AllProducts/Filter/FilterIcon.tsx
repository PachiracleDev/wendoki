import React from "react";
import { IoFilterSharp } from "react-icons/io5";

function FilterIcon({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
	return (
		<div
			onClick={() => setIsOpen(true)}
			className="inline-flex gap-1 xl:hidden items-center justify-center rounded-md bg-white border shadow-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			Filtros
			<IoFilterSharp className="h-5 w-5" />
		</div>
	);
}

export default FilterIcon;
