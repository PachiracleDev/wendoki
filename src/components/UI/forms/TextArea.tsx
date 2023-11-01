import React from "react";
import styles from "./textarea.module.css";
import { Field } from "formik";
type TextareaProps = {
	label: string;
	handleBlur: any;
	name: string;
	isError: any;
	touched: any;
	limitChar: number;
	stateField: string;
};
function TextArea({
	label,
	handleBlur,
	name,
	isError,
	touched,
	limitChar,
	stateField,
}: TextareaProps) {
	return (
		<div>
			<div className={styles.containerTextarea}>
				<Field
					as="textarea"
					cols={30}
					rows={4}
					name={name}
					onBlur={handleBlur}
					id={label}
					placeholder=" "
					className={
						"dark:bg-stone-700 text-gray-600 dark:text-gray-200 dark:border-stone-700 bg-gray-100 border border-gray-200 focus:border-gray-300 outline-none focus:outline-none focus:ring-0 " +
						styles.textareaCustom +
						" " +
						(isError && touched ? styles.textareaCustomError : "")
					}
				/>
				<label htmlFor={label} className={styles.labelTextarea}>
					{label}
				</label>
			</div>
			<div className="flex justify-between w-full  font-medium">
				{isError && touched && (
					<div className="text-red-500 text-xs p-1">{isError}</div>
				)}
				<span className="text-xs">
					{stateField.length}/{limitChar}
				</span>
			</div>
		</div>
	);
}

export default TextArea;
