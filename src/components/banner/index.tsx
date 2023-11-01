import { memo } from "react";
import Image from "next/image";
import classNames from "classnames";
import { motion } from "framer-motion";

function DummyWrapper({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}

function Container({ children }: { children: React.ReactNode }) {
	return <div className=" lg:mx-20 sm:mx-15">{children}</div>;
}

function Banner({
	urlImage,
	fullWidth = false,
	title,
	description,
	subtitle,
}: {
	urlImage: string;
	fullWidth: boolean;
	title: string;
	description: string;
	subtitle: string;
}) {
	const Wraper = fullWidth ? DummyWrapper : Container;

	return (
		<>
			<Wraper>
				<div
					className={classNames("relative  text-white ", {
						"h-[50vh]": fullWidth,
						"h-44 lg:h-[35vh]": !fullWidth,
					})}
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
					>
						<Image
							src={urlImage}
							fill
							alt="Banner Wendoki"
							className="object-cover object-center"
						/>
					</motion.div>
					<div className="bg-black/20 inset-0 absolute z-0" />
					<div className="absolute inset-0">
						<div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-2 lg:gap-0 lg:flex-row lg:p-12">
							<div className="flex flex-col  gap-2 laptop:gap-4 w-full laptop:w-3/6">
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.7, delay: 0 }}
								>
									{subtitle}
								</motion.p>
								<motion.h1
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.7, delay: 0.2 }}
									className="text-3xl font-bold lg:text-4xl"
								>
									{title}
								</motion.h1>
							</div>
							<p className="w-full text-xl lg:w-1/2 font-bold hidden lg:block">
								{description}
							</p>
						</div>
					</div>
				</div>
			</Wraper>
			<p className="text-gray-500 lg:hidden mt-4 text-center font-light">
				{description}
			</p>
		</>
	);
}

export default memo(Banner);
