import Banner from "@components/banner";
import Layout from "@layout/index";
import React from "react";

function UbicanosPage() {
	return (
		<Layout>
			<Banner
				title="Ubicanos"
				subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
				urlImage="https://res.cloudinary.com/gongian/image/upload/v1679314025/clark-street-mercantile-qnKhZJPKFD8-unsplash_tehjz3.jpg"
				fullWidth={false}
				description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
			/>
			<div className="w-full my-12 lg:max-w-5xl mx-auto">
				<div className="flex flex-col w-full justify-center lg:flex-row gap-4 lg:gap-8 sm:p-2">
					<div className="w-full lg:w-[1000px]">
						<iframe
							src="https://www.google.com/maps/embed?pb=!4v1679326204057!6m8!1m7!1s0TGrFW18JtgBKwWVKng4bg!2m2!1d-22.92245901804042!2d-43.17702229722279!3f104.22331241080511!4f-10.585166086783147!5f0.7820865974627469"
							height="450"
							className="w-full"
							loading="lazy"
						></iframe>
					</div>

					<div className="max-w-sm">
						<h4 className="text-2xl font-bold text-center flex flex-col items-center">
							Encantados en atenderte en nuestras tiendas físicas.
							<div className="bg-gradient-to-r from-primary/60 to-primary h-1 w-24 rounded-full" />
						</h4>
						<p className="text-gray-500 mt-4 text-sm">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
							quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Quisquam, quod. Lorem ipsum dolor sit amet consectetur
						</p>
						<div className="text-sm">
							<strong>Ubicación:</strong> Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Quisquam, quod.
						</div>
						<div className="text-sm">
							<strong>Dirección:</strong> Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Quisquam, quod.
						</div>
						<div className="text-sm">
							<strong>Teléfono:</strong> {process.env.NEXT_PUBLIC_PHONE_NUMBER}
						</div>
						<div className="text-gray-500 text-sm p-2 text-center">
							Disponibilidad: Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quisquam, quod. Lorem ipsum dolor sit
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default UbicanosPage;
