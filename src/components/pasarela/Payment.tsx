import { useState } from "react";
import ContraEntrega from "./ContraEntrega";
import Paypal from "./Paypal";
import MercadoPago from "./MercadoPago";

function Payment({
	amount,
	infoEnvio,
	finish,
	products,
	setFinish,
}: {
	amount: number;
	infoEnvio: any;
	finish: boolean;
	setFinish: React.Dispatch<React.SetStateAction<boolean>>;
	products: Array<Object>;
}) {
	const [paymentType, setPaymentType] = useState<
		"paypal" | "mercadopago" | "contraentrega" | null
	>(null);

	return (
		<div>
			<h3 className="text-2xl font-bold text-center">Método de pago</h3>
			{finish ? (
				<p className="text-2xl text-primary font-bold text-center p-2">
					{paymentType?.toUpperCase()}
				</p>
			) : (
				<div className="flex justify-center my-4 gap-3 items-center">
					<button
						onClick={() => setPaymentType("contraentrega")}
						className={`btn text-sm rounded-md px-3 py-2 ${
							paymentType === "contraentrega" && "bg-primary text-white"
						}`}
					>
						Contra entrega
					</button>
					<button
						onClick={() => setPaymentType("paypal")}
						className={`btn text-sm rounded-md px-3 py-2 ${
							paymentType === "paypal" && "bg-primary text-white"
						}`}
					>
						Paypal
					</button>
					<button
						onClick={() => setPaymentType("mercadopago")}
						className={`btn text-sm rounded-md px-3 py-2 ${
							paymentType === "mercadopago" && "bg-primary text-white"
						}`}
					>
						Mercado Pago
					</button>
				</div>
			)}

			{paymentType === "contraentrega" && (
				<ContraEntrega
					setFinish={setFinish}
					amount={amount}
					infoEnvio={infoEnvio}
					products={products}
				/>
			)}
			{paymentType === "paypal" && (
				<Paypal
					setFinish={setFinish}
					amount={amount}
					infoEnvio={infoEnvio}
					products={products}
				/>
			)}
			{paymentType === "mercadopago" && (
				<MercadoPago
					setFinish={setFinish}
					amount={amount}
					infoEnvio={infoEnvio}
					products={products}
				/>
			)}
		</div>
	);
}

export default Payment;
