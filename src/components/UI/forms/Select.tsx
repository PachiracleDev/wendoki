import React, { useState } from "react";
import styles from "./select.module.css";

import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";

type InputProps = {
	label: string;
	value: string;
	name: string;
	isError: any;
	setFieldValue: any;
	touched: any;
	items: string[];
	stopSelect: boolean;
};

function Select({
	label,
	isError,
	touched,
	stopSelect,
	value,
	items,
	name,
	setFieldValue,
}: InputProps) {
	const [expanded, setExpanded] = useState(false);

	const handleChange = (val: string) => {
		setFieldValue(name, val);
		setExpanded(!expanded);
	};

	return (
		<div>
			<div className="relative min-w-[200px]">
				<div>
					<div
						onClick={() => {
							if (stopSelect) {
								return;
							}
							setExpanded(!expanded);
						}}
						className={`${styles.containerInput}`}
					>
						<div
							className={`capitalize cursor-pointer bg-gray-100 border border-gray-200  ${styles.containerSelect}`}
						>
							<label
								className={`${styles.labelSelect} ${
									value.length > 2 && styles.labelTranslate
								}`}
							>
								{label}
							</label>

							{value}
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
					className={`max-h-60 min-w-full rounded-b-md bg-white border-gray-200 overflow-y-auto contenedor-light flex flex-col shadow ${
						expanded ? "border" : "!border-none"
					}`}
				>
					{items.map((item, index) => (
						<div
							onClick={() => handleChange(item)}
							className={`cursor-pointer m-2 hover:bg-gray-50  duration-300 transition-colors rounded p-3  text-sm ${
								value.includes(item) ? "bg-gray-100" : ""
							}`}
							key={index}
						>
							{item}
						</div>
					))}
				</motion.div>
			</div>
			{isError && touched && (
				<div className="text-red-500 text-xs font-medium p-1">{isError}</div>
			)}
		</div>
	);
}

export default Select;
