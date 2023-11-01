import { useState, useEffect } from "react";
import { useMercadopago } from "react-sdk-mercadopago";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { Fireworks } from "@fireworks-js/react";
import PaymentSuccess from "./PaymentSuccess";

type ResultPayment = {
	status: "approved" | "pending" | "rejected" | "refunded" | "canceled";
	status_detail: string;
	operationId: string;
};

function MercadoPago({
	infoEnvio,
	amount,
	products,
	setFinish,
}: {
	infoEnvio: any;
	amount: number;
	products: any;
	setFinish: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [operationId, setOperationId] = useState<string | null>(null);
	const mercadopago = useMercadopago.v2(
		`${process.env.NEXT_PUBLIC_MERCADOPAGO_TEST_KEY}`,
		{
			locale: "es-PE",
		}
	) as any;

	useEffect(() => {
		if (!!mercadopago && !!infoEnvio) {
			setLoading(true);
			const bricksBuilder = mercadopago.bricks();
			const renderCardPaymentBrick = async (bricksBuilder: any) => {
				const settings = {
					initialization: {
						amount,
						payer: {
							email: "",
						},
					},
					customization: {
						visual: {
							style: {
								theme: "default",
								baseColor: "#2dd4bf",
							},
						},
					},
					callbacks: {
						onReady: () => {
							setLoading(false);
						},
						onSubmit: (cardFormData: any) => {
							return new Promise((resolve, reject) => {
								if (!infoEnvio) {
									enqueueSnackbar("Debes ingresar los datos de envio", {
										variant: "error",
									});
									reject();
								}

								fetch(`/api/payments/mercadopago`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										processPaymentInput: {
											...cardFormData,
											metadata: {
												infoEnvio,
												productos: products,
											},
										},
									}),
								})
									.then((response) => response.json())
									.then((result: ResultPayment) => {
										if (result.status === "rejected") {
											if (
												result.status_detail ===
												"cc_rejected_bad_filled_card_number"
											) {
												setError("Número de tarjeta incorrecto");

												reject();
												return;
											}

											if (
												result.status_detail ===
												"cc_rejected_insufficient_amount"
											) {
												setError("Saldo insuficiente");

												reject();
												return;
											}
											if (
												result.status_detail ===
												"cc_rejected_call_for_authorize"
											) {
												setError(
													"Contactate con tu banco para autorizar el pago online"
												);
												reject();
												return;
											}
											if (
												result.status_detail === "cc_rejected_bad_filled_other"
											) {
												setError("Datos de tarjeta incorrectos");
												reject();
												return;
											}
											setError("Error al procesar el pago");
											reject();
											return;
										}

										if (result.status === "approved") {
											resolve(result);
											Cookies.remove("cart");
											Cookies.remove("nostock");
											setFinish(true);
											enqueueSnackbar("Pago realizado con éxito", {
												variant: "success",
												autoHideDuration: 3000,
											});

											setOperationId(result.operationId);
											return;
										}
									})
									.catch((error) => {
										setError("Error al procesar el pago");

										reject();
									});
							});
						},
						onError: (error: Error) => {
							setLoading(false);
							setError("Error al crear la pasarela de pago");
							// callback llamado para todos los casos de error de Brick
						},
					},
				};
				// @ts-ignore
				window.cardPaymentBrickController = await bricksBuilder.create(
					"cardPayment",
					"cardPaymentBrick_container",
					settings
				);
				setLoading(false);
			};
			renderCardPaymentBrick(bricksBuilder);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mercadopago, infoEnvio]);

	return (
		<>
			{!!infoEnvio && !operationId && (
				<>
					{loading && (
						<div className="animate-pulse w-full bg-gray-200   h-96 p-2 rounded-md" />
					)}
					<div id="cardPaymentBrick_container" />
					{error && <p className="text-sm text-red-400 p-2 mt-3">{error}</p>}
				</>
			)}
			{operationId && (
				<PaymentSuccess
					operationId={operationId}
					message="Pago realizado con éxito"
				/>
			)}
		</>
	);
}

export default MercadoPago;
