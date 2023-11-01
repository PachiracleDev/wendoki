import CartIcon from "@components/cart-modal/CartIcon";
import Footer from "@components/navigation/Footer";
import Navbar from "@components/navigation/Navbar";
import WspIcon from "@components/navigation/WspIcon";
import { memo } from "react";
import { useRouter } from "next/router";
import ChangeCountry from "@components/navigation/ChangeCountry";

function LayoutMain({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<>
			<Navbar />
			{children}

			<div className="flex gap-2 z-10 flex-col fixed bottom-3 right-3">
				{/* <ChangeCountry /> */}
				<WspIcon />
				{router.pathname !== "/pasarela" && router.pathname !== "/no-stock" && (
					<CartIcon />
				)}
			</div>

			<Footer />
		</>
	);
}

export default memo(LayoutMain);
