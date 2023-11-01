import { useState } from "react";
import { useSnackbar } from "notistack";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import PaymentSuccess from "./PaymentSuccess";

function Paypal({
	amount,
	infoEnvio,
	setFinish,
	products,
}: {
	amount: number;
	infoEnvio: any;
	setFinish: React.Dispatch<React.SetStateAction<boolean>>;
	products: Array<Object>;
}) {
	const { enqueueSnackbar } = useSnackbar();
	const [operationId, setOperationId] = useState(null);

	function onError(err: any) {
		enqueueSnackbar("Hubo un error al procesar el pago.", { variant: "error" });
	}

	function createOrder(data: Record<string, unknown>, actions: any) {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: String(
								(amount / +`${process.env.NEXT_PUBLIC_EXCHANGE_RATE}`).toFixed(
									2
								)
							),
						},
					},
				],
			})
			.then((orderID: any) => {
				return orderID;
			});
	}
	function onApprove(data: any, actions: any) {
		return actions.order.capture().then(async function (details: any) {
			try {
				const body = {
					compraId: details.id,
					correo: details.payer.email_address,
					infoEnvio,
					products,
					amount: details.purchase_units[0].amount.value,
					status: details.status,
				};

				setOperationId(details.id);

				const { data } = await axios.post(`/api/payments/paypal`, body);

				if (!data) {
					enqueueSnackbar("Hubo un errro al procesar el pago", {
						variant: "error",
					});
					return;
				}

				setFinish(true);
				setOperationId(data.operationId);

				enqueueSnackbar("Order is paid", { variant: "success" });
			} catch (err) {
				enqueueSnackbar("Hubo un errro al procesar el pago", {
					variant: "error",
				});
			}
		});
	}

	return (
		<div>
			<div className="p-2">
				<p className="text-gray-500 text-sm">
					Debido a que paypal no permite realizar pagos con la moneda peruana,
					la tasa de cambio sera de{" "}
					<strong className="font-sans">
						1 USD = S/ {process.env.NEXT_PUBLIC_EXCHANGE_RATE}
					</strong>
				</p>

				<p className="text-sm text-primary font-medium">
					El total a pagar es de:{" "}
					<strong className="font-sans">
						${(amount / +`${process.env.NEXT_PUBLIC_EXCHANGE_RATE}`).toFixed(2)}{" "}
						(DOLARES)
					</strong>
				</p>
			</div>
			{operationId ? (
				<PaymentSuccess
					message="El pago se realizo con exito."
					operationId={operationId}
				/>
			) : (
				<PayPalButtons
					createOrder={createOrder}
					onApprove={onApprove}
					onError={onError}
				></PayPalButtons>
			)}
		</div>
	);
}

export default Paypal;
