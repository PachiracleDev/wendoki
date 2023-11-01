import Banner from "@components/banner";
import Layout from "@layout/index";
import Image from "next/image";

function NosotrosPage() {
	return (
		<Layout>
			<Banner
				title="Nosotros"
				subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
				urlImage="https://res.cloudinary.com/gongian/image/upload/v1679314025/charles-forerunner-3fPXt37X6UQ-unsplash_nz6nwy.jpg"
				fullWidth={false}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
			/>
			<div className="w-full my-12 lg:max-w-5xl mx-auto">
				<div className="flex flex-col items-center w-full justify-center lg:flex-row lg:items-start gap-4 lg:gap-8 sm:p-2">
					<div className="relative w-full max-w-xl">
						<Image
							src="https://res.cloudinary.com/gongian/image/upload/v1679330009/antenna-ohNCIiKVT1g-unsplash_pxiobd.jpg"
							alt="Nosotros"
							height={700}
							width={700}
							sizes="100%"
						/>
					</div>
					<div>
						<div className="max-w-xl">
							<h4 className="text-2xl font-bold text-center flex flex-col items-center">
								Comprometidos con la calidad y el servicio al cliente.
								<div className="bg-gradient-to-r from-primary/60 to-primary h-1 w-24 rounded-full" />
							</h4>
							<p className="text-gray-500 p-2 text-sm">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Quisquam, quod. Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
								consectetur
							</p>
							<div className="flex gap-4 items-center justify-center">
								<div className="flex flex-col items-center">
									<Image
										src="https://res.cloudinary.com/gongian/image/upload/v1679330009/julian-wan-WNoLnJo7tS8-unsplash_wfslqg.jpg"
										alt="Ceo de la empresa"
										height={80}
										width={70}
										className="rounded-full"
									/>
									<div className="flex flex-col items-center">
										<span className="font-bold text-sm">CEO</span>
										<span className="text-gray-500 text-xs font-light">
											Nombre del CEO
										</span>
									</div>
								</div>
								<div className="flex flex-col items-center">
									<Image
										src="https://res.cloudinary.com/gongian/image/upload/v1679330009/jake-nackos-IF9TK5Uy-KI-unsplash_pg7lbi.jpg"
										alt="Ceo de la empresa"
										height={70}
										width={60}
										className="rounded-full"
									/>
									<div className="flex flex-col items-center">
										<span className="font-bold text-sm">ADMINISTRADORA</span>
										<span className="text-gray-500 text-xs font-light">
											Nombre de la administradorA
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default NosotrosPage;
