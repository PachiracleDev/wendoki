import { useState } from "react";
import axios from "axios";
import PaymentSuccess from "./PaymentSuccess";
import { useSnackbar } from "notistack";

function ContraEntrega({
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
	const [operationId, setOperationId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const handleAccept = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post("/api/payments/contraentrega", {
				infoEnvio,
				products,
			});
			setLoading(false);

			if (data) {
				enqueueSnackbar("Orden creada con éxito!", {
					variant: "success",
				});
				setFinish(true);
				setOperationId(data.operationId);
			}
		} catch (error) {
			enqueueSnackbar("Hubo un errro al crear la orden", {
				variant: "error",
			});
			setLoading(false);
		}
	};

	return (
		<div>
			<p className="text-sm mb-4 text-gray-500">
				Al hacer click en {"Aceptar"} estás aceptando los términos y condiciones
				de la tienda. Y que el pago se realizará en efectivo al momento de la
				entrega. (S/. {amount} SOLES)
				<br />
				<br />
				Ten en cuenta que el tiempo aproximado de entrega es de 3 a 5 días
				hábiles. Se le comunicara por WhatsApp para coordinar con su envío.
				Asegurece de haber ingresado un número de teléfono válido, caso
				contrario puede editarlo. Si tiene alguna duda o inconveniente puede
				comunicarse al {process.env.NEXT_PUBLIC_PHONE_NUMBER}.
			</p>
			{operationId ? (
				<PaymentSuccess
					message="Listo, orden creada con éxito"
					operationId={operationId}
				/>
			) : (
				<div className="flex justify-end">
					<button
						onClick={handleAccept}
						disabled={loading}
						className="mt-4 btn px-4 py-2 text-sm"
					>
						{loading ? "Cargando..." : "Aceptar"}
					</button>
				</div>
			)}
		</div>
	);
}

export default ContraEntrega;
