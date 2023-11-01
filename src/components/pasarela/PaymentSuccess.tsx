import { useEffect, useState } from "react";
import { Fireworks } from "@fireworks-js/react";

function PaymentSuccess({
	message,
	operationId,
}: {
	message: string;
	operationId: string;
}) {
	const [activate, setActivate] = useState(true);
	useEffect(() => {
		if (activate) {
			setTimeout(() => {
				setActivate(false);
				return () => {};
			}, 15000);
		}
	}, [activate]);

	return (
		<div>
			<div>
				<h4 className="text-lg font-medium text-green-500">¡Muchas gracias!</h4>
				<span>
					Tu número de operación es:{" "}
					<span className="font-bold">{operationId}</span>
				</span>
				<p className="text-sm text-gray-500">{message}</p>
				<p className="text-gray-400 p-2 text-sm">
					Se le comunicara por WhatsApp cuando su pedido este listo para envíar.
					Si tiene alguna duda o inconveniente puede comunicarse al{" "}
					<span className="font-sans">
						{process.env.NEXT_PUBLIC_PHONE_NUMBER}
					</span>
					brindando su número de operación.
				</p>
			</div>

			{activate && (
				<Fireworks
					options={{
						rocketsPoint: {
							min: 0,
							max: 50,
						},
						explosion: 5,
					}}
					style={{
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: -1,
						position: "absolute",
						background: "transparent",
					}}
				/>
			)}
		</div>
	);
}

export default PaymentSuccess;
