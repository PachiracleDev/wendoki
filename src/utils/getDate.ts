export const getDateNow = () => {
	const now = new Date();
	const options = { timeZone: "America/Lima" };
	const formatter = new Intl.DateTimeFormat("es-PE", options);
	const formattedDate = formatter.format(now) + " " + now.toLocaleTimeString();
	return formattedDate;
};
