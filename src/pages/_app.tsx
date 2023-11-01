import { CartStoreProvider } from "@store/cartshopping";
import "@styles/globals.css";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", (url) => {
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Ecomerce</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="Gotitas es una plataforma donde puedes compartir tus experiencias y encontrar a personas con las que conectarte."
				/>
				<link
					rel="icon"
					href="https://res.cloudinary.com/gongian/image/upload/v1651291924/samples/ecommerce/shoes.png"
				/>
			</Head>
			<CartStoreProvider>
				<SnackbarProvider>
					<PayPalScriptProvider
						deferLoading={false}
						options={{
							"client-id": process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL || "",
							currency: "USD",
						}}
					>
						<Component {...pageProps} />
					</PayPalScriptProvider>
				</SnackbarProvider>
			</CartStoreProvider>
		</>
	);
}
