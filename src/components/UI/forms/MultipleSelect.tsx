import React, { useState } from "react";
import styles from "./select.module.css";

import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";

type InputProps = {
	label: string;
	value?: string;
	name: string;
	isError: any;
	type: string;
	filtersRef: any;
	touched: any;
	items: string[];
};

function Select({
	label,
	isError,
	touched,
	value,
	items,
	type,
	filtersRef,
}: InputProps) {
	const [selects, setSelects] = useState<string[]>([]);
	const [expanded, setExpanded] = useState(false);

	const handleChange = (name: string) => {
		const newSelects = selects.includes(name)
			? selects.filter((item) => item !== name)
			: [...selects, name];
		setSelects(newSelects);

		filtersRef.current.apariencia[type] = newSelects;
	};

	return (
		<>
			<div className="relative">
				<div>
					<div
						onClick={() => setExpanded(!expanded)}
						className={`${styles.containerInput}`}
					>
						<div
							className={`capitalize cursor-pointer border dark:bg-stone-800 dark:border-[#404149] bg-gray-100 border-gray-200 ${styles.containerSelect}`}
						>
							<label
								className={`dark:text-gray-200 text-gray-500 ${
									styles.labelSelect
								} ${selects.length >= 1 && styles.labelTranslate}`}
							>
								{label}
							</label>

							{selects.length >= 1 && (
								<div className="flex gap-2 flex-wrap">
									{selects.map((item, index) => (
										<span key={index}>
											{item}
											{selects.length !== index + 1 ? "," : "."}
										</span>
									))}
								</div>
							)}
						</div>
						<BsChevronDown
							size={15}
							className={`absolute top-6 right-3 duration-500 ${
								expanded ? "transform rotate-180" : ""
							}`}
						/>
					</div>
				</div>
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: expanded ? "auto" : 0 }}
					transition={{ duration: 0.5 }}
					className={`max-h-60 min-w-full rounded-md  dark:bg-stone-700 dark:border-[#404149] overflow-y-auto contenedor-light dark:contenedor flex flex-col shadow ${
						expanded ? "border" : "!border-none"
					}`}
				>
					{items.map((item, index) => (
						<div
							onClick={() => handleChange(item)}
							className={`cursor-pointer m-2 hover:bg-opacity-60 dark:hover:bg-stone-600 duration-300 transition-colors rounded p-3  text-sm ${
								selects.includes(item) ? "dark:bg-stone-600 bg-gray-100" : ""
							}`}
							key={index}
						>
							{item}
						</div>
					))}
				</motion.div>
			</div>
			{isError && touched && (
				<div className="text-red-500 text-xs  font-light p-1">{isError}</div>
			)}
		</>
	);
}

export default Select;
