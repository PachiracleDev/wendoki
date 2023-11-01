import * as Yup from "yup";

export const datosEnvioSchema = Yup.object().shape({
	nombreCompleto: Yup.string().required("Es requerido"),
	telefono: Yup.string()
		.min(9, "El mínimo de caracteres es 9")
		.required("Es requerido"),
	departamento: Yup.string().required("Es requerido"),
	distrito: Yup.string().required("Es requerido"),
	direccion: Yup.string().required("Es requerido"),
	referencia: Yup.string().required("Es requerido"),
});
