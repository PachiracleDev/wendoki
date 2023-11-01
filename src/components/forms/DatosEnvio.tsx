import React from "react";
import { Formik, Form, Field } from "formik";
import InputField from "@components/UI/forms/InputField";
import Select from "@components/UI/forms/Select";
import { departamentos } from "../../../info";
import { datosEnvioSchema } from "@schemas";

function DatosEnvio({
	setInfoEnvio,
	infoEnvio,
	finish,
}: {
	setInfoEnvio: any;
	infoEnvio: any;
	finish: boolean;
}) {
	return (
		<div className="mb-4">
			<Formik
				initialValues={{
					nombreCompleto: "",
					telefono: "",
					departamento: "",
					distrito: "",
					direccion: "",
					referencia: "",
				}}
				validationSchema={datosEnvioSchema}
				onSubmit={(values) => {
					if (!!infoEnvio) {
						setInfoEnvio(null);
						return;
					}

					setInfoEnvio(values);
				}}
			>
				{({ errors, values, touched, handleBlur, setFieldValue }) => (
					<Form className="flex flex-col gap-4">
						<InputField
							handleBlur={handleBlur}
							stopWriting={!!infoEnvio}
							isError={errors.nombreCompleto}
							label="Nombre completo"
							touched={touched.nombreCompleto}
							name="nombreCompleto"
							type="text"
						/>
						<InputField
							stopWriting={!!infoEnvio}
							handleBlur={handleBlur}
							isError={errors.telefono}
							label="Telefono"
							touched={touched.telefono}
							name="telefono"
							type="number"
						/>
						<Select
							isError={errors.departamento}
							items={Object.keys(departamentos)}
							stopSelect={!!infoEnvio}
							label="Departamento"
							name="departamento"
							touched={touched.departamento}
							value={values.departamento}
							setFieldValue={setFieldValue}
						/>
						<Select
							isError={errors.distrito}
							stopSelect={!!infoEnvio}
							items={
								departamentos[
									values.departamento as keyof typeof departamentos
								] || []
							}
							label="Distrito"
							name="distrito"
							setFieldValue={setFieldValue}
							touched={touched.distrito}
							value={values.distrito}
						/>
						<InputField
							handleBlur={handleBlur}
							isError={errors.departamento}
							label="Direccion"
							stopWriting={!!infoEnvio}
							touched={touched.departamento}
							name="direccion"
							type="text"
						/>
						<InputField
							handleBlur={handleBlur}
							stopWriting={!!infoEnvio}
							isError={errors.distrito}
							label="Referencia"
							touched={touched.distrito}
							name="referencia"
							type="text"
						/>
						{!finish && (
							<button type="submit" className="btn px-4 py-2">
								{infoEnvio ? "Editar" : "Siguiente"}
							</button>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default DatosEnvio;
