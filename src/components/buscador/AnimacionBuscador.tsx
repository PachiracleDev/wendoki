import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lista = ["Polos", "Shorts", "Pantalones", "Pulseras"];

function AnimacionBuscador() {
	const [itemSteop, setItemStep] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (itemSteop === 3) {
				setItemStep(0);
			} else {
				setItemStep(itemSteop + 1);
			}
		}, 1500);
		return () => clearInterval(interval);
	}, [itemSteop]);

	return (
		<>
			{lista.map((item, index) => {
				return (
					<AnimatePresence key={index}>
						{itemSteop === index && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: index * 0.5 }}
								key={index}
								className="font-bold"
							>
								{item}
							</motion.div>
						)}
					</AnimatePresence>
				);
			})}
		</>
	);
}

export default AnimacionBuscador;
