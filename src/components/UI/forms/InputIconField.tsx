import { useState } from "react";
import styles from "./inputicon.module.css";
import { Field } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type InputProps = {
	type: string;
	label: string;
	handleBlur: any;
	name: string;
	isError: any;
	touched: any;

	iconComponent: React.ReactNode;
};

function InputIconField({
	type,
	label,
	isError,
	touched,
	name,

	handleBlur,
	iconComponent,
}: InputProps) {
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<div className={styles.containerInput}>
				<div className=" rounded-r-md absolute left-0 top-0.5   h-14 px-5  flex items-center justify-center">
					{iconComponent}
				</div>

				<Field
					type={type === "password" ? (visible ? "text" : "password") : type}
					name={name}
					onBlur={handleBlur}
					id={label}
					placeholder=" "
					className={
						styles.inputCustom +
						" dark:bg-stone-800 dark:border-stone-700 text-gray-600  focus:ring-0 focus:outline-none focus:border-gray-200 dark:text-gray-200 bg-gray-100 border border-gray-200 " +
						(isError && touched ? styles.inputCustomError : "")
					}
				/>
				<label htmlFor={label} className={styles.labelInput}>
					{label}
				</label>

				{type === "password" && (
					<div
						onClick={() => setVisible(!visible)}
						className="rounded-r-md absolute right-0 top-0 text-gray-400 cursor-pointer hover:text-gray-300 h-16 px-5  flex items-center justify-center"
					>
						{visible ? (
							<BsEyeSlash className="h-5 w-5" />
						) : (
							<BsEye className="h-5 w-5" />
						)}
					</div>
				)}
			</div>
			{isError && touched && (
				<div className="text-red-500 text-xs  font-light p-1">{isError}</div>
			)}
		</div>
	);
}

export default InputIconField;
