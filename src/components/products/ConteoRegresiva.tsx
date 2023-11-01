import React, { useEffect, useState, useMemo } from "react";
import { BsAlarm } from "react-icons/bs";

function CuentaRegresiva({ dateEnd }: { dateEnd: string }) {
	const [dia, mes, anio] = dateEnd.split("/");

	const [time, setTime] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const dateEndDiscount = useMemo(() => {
		return new Date(+anio, +mes - 1, +dia);
	}, [anio, mes, dia]);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = dateEndDiscount.getTime() - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			setTime({ days, hours, minutes, seconds });
		}, 1000);
		return () => clearInterval(interval);
	}, [dateEndDiscount]);

	return (
		<div className="flex items-center text-red-500 gap-2">
			<BsAlarm className="h-5 w-5" />
			<h4>Tiempo restante:</h4>
			{time.days < 0 || time.hours < 0 || time.minutes < 0 ? (
				<span className="">Finalizado</span>
			) : (
				<span className="font-sans">
					{time.days} d {time.hours} h {time.minutes} m {time.seconds} s
				</span>
			)}
		</div>
	);
}

export default CuentaRegresiva;
