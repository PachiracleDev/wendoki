import React from "react";
import styles from "./input.module.css";
import { Field } from "formik";

type InputProps = {
	type: string;
	label: string;
	handleBlur: any;
	name: string;
	isError: any;
	stopWriting: boolean;
	touched: any;
};

function InputField({
	type,
	label,
	stopWriting,
	isError,
	touched,
	name,
	handleBlur,
}: InputProps) {
	return (
		<div className="">
			<div className={styles.containerInput}>
				<Field
					type={type}
					name={name}
					onBlur={handleBlur}
					disabled={stopWriting}
					id={label}
					placeholder=" "
					className={
						styles.inputCustom +
						" text-stone-600 focus:ring-0 focus:outline-none focus:border-gray-200   bg-gray-100 border border-gray-200 " +
						(isError && touched ? styles.inputCustomError : "")
					}
				/>

				<label htmlFor={label} className={styles.labelInput}>
					{label}
				</label>
			</div>
			{isError && touched && (
				<div className="text-red-500 text-xs font-medium p-1">{isError}</div>
			)}
		</div>
	);
}

export default InputField;
