export const verifyDiscount = (fechaStr: string | null): boolean => {
	if (!fechaStr) return false;

	const [dia, mes, anio] = fechaStr.split("/");
	const fecha = new Date(+anio, +mes - 1, +dia);
	const actualDate = new Date();

	return actualDate.getTime() < fecha.getTime();
};
