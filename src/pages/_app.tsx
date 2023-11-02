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

const SeoList = {
	title: "Wendoki - Productos kawaii ❤️",
	description:
		"Tienda online de productos kawaii ❤️, envíos a todo el Perú. Productos de calidad, 100% originales.",
	href: "/",
	url: "https://wendoki.com",
	keywords: "productos kawaii",
	robots: "all",
	author: "Wendoki",
	publisher: "Wendoki",
	image:
		"https://bafybeicxj2hpczm6uxsdpsnwyxz6pom6ty4eeb7o6uzuey5btgcxgrrg4e.ipfs.w3s.link/wendoki-2.png",
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{SeoList.title}</title>
				<meta name="description" content={SeoList.description} />
				<meta name="keywords" content={SeoList.keywords} />
				<link rel="canonical" href={SeoList.url} />
				<meta name="robots" content={SeoList.robots} />
				<meta name="author" content={SeoList.author} />
				<meta name="publisher" content={SeoList.publisher} />
				<meta name="language" content="ES" />

				<meta property="og:title" content={SeoList.title} />
				<meta property="og:description" content={SeoList.description} />
				<meta property="og:url" content={SeoList.url} />
				<meta property="og:image" content={SeoList.image} />
				<meta property="og:image:width" content="500" />
				<meta property="og:image:height" content="500" />
				<meta property="og:image:alt" content="Wendoki" />
				<meta property="og:type" content="website" />

				<meta name="twitter:title" content={SeoList.title} />
				<meta name="twitter:description" content={SeoList.description} />
				<meta name="twitter:image" content={SeoList.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="icon"
					type="image/png"
					href="https://res.cloudinary.com/diprat1kf/image/upload/v1698892765/Proyecto_nuevo_4_jyxshs.png"
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
