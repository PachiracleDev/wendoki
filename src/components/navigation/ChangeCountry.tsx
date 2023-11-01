import React, { Fragment } from "react";
import { IoEarth } from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import PeruFlag from "../../../public/flag-peru.png";
import Image from "next/image";

const UnitedStateFlag = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		id="Layer_1"
		x={0}
		y={0}
		className="h-5 w-5"
		viewBox="0 0 55.2 38.4"
	>
		<style>{".st1{fill:#fff}"}</style>
		<path
			d="M3.03 0h49.13c1.67 0 3.03 1.36 3.03 3.03v32.33c0 1.67-1.36 3.03-3.03 3.03H3.03A3.02 3.02 0 0 1 0 35.37V3.03C0 1.36 1.36 0 3.03 0z"
			style={{
				fill: "#b22234",
			}}
		/>
		<path
			d="M.02 2.73h55.17c.01.1.02.2.02.31v2.94H0V3.03c0-.1.01-.2.02-.3zM55.2 8.67v3.24H0V8.67h55.2zm0 5.94v3.24H0v-3.24h55.2zm0 5.94v3.24H0v-3.24h55.2zm0 5.94v3.24H0v-3.24h55.2zm0 5.94v2.93c0 .1-.01.21-.02.31H.02c-.01-.09-.02-.2-.02-.3v-2.93h55.2v-.01z"
			className="st1"
		/>
		<path
			d="M20.8 0v20.68H0V3.03C0 1.36 1.36 0 3.03 0H20.8z"
			style={{
				fill: "#3c3b6e",
			}}
		/>
		<path
			d="m1.23 2.86.69 2.15L.1 3.68h2.26L.53 5.01l.7-2.15zm0 4.16.69 2.15L.1 7.84h2.26L.53 9.17l.7-2.15zm0 4.16.69 2.15L.1 12h2.26L.53 13.33l.7-2.15zm0 4.16.69 2.15L.1 16.16h2.26L.53 17.49l.7-2.15zM3.67.78l.7 2.15L2.54 1.6h2.27L2.97 2.93l.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.27L2.97 7.09l.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.27l-1.84 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.27l-1.84 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.27l-1.84 1.33.7-2.15zM6.12 2.86l.7 2.15-1.83-1.33h2.26L5.42 5.01l.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26L5.42 9.17l.7-2.15zm0 4.16.7 2.15L4.99 12h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zM8.57.78l.69 2.15L7.44 1.6H9.7L7.87 2.93l.7-2.15zm0 4.16.69 2.15-1.82-1.33H9.7L7.87 7.09l.7-2.15zm0 4.16.69 2.15-1.82-1.33H9.7l-1.83 1.33.7-2.15zm0 4.16.69 2.15-1.82-1.33H9.7l-1.83 1.33.7-2.15zm0 4.16.69 2.15-1.82-1.33H9.7l-1.83 1.33.7-2.15zm2.44-14.56.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15L9.88 12h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zM13.46.78l.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zM15.9 2.86l.7 2.15-1.83-1.33h2.26l-1.82 1.33.69-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.82 1.33.69-2.15zm0 4.16.7 2.15L14.77 12h2.26l-1.82 1.33.69-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.82 1.33.69-2.15zM18.35.78l.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15zm0 4.16.7 2.15-1.83-1.33h2.26l-1.83 1.33.7-2.15z"
			className="st1"
		/>
	</svg>
);

function ChangeCountry() {
	return (
		<>
			<Menu as={Fragment}>
				<Menu.Button className="bg-gradient-to-r z-10 from-blue-400 to-blue-500 shadow-md text-white p-2 rounded-full">
					<IoEarth size={29} />
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100 transform"
					enterFrom="transform opacity-0 scale-95 -translate-y-1 md:translate-y-1"
					enterTo="transform opacity-100 scale-100 translate-y-0"
					leave="transition ease-in duration-75 transform"
					leaveFrom="transform opacity-100 scale-100 translate-y-0"
					leaveTo="transform opacity-0 scale-95 -translate-y-1 md:translate-y-1"
				>
					<Menu.Items className="fixed z-[50] right-[4rem] bg-white dark:bg-black border-gray-200 dark:border-stone-800 border mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="p-1">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() => {}}
										className={` group flex w-full gap-2 items-center rounded-md px-2 py-2 text-sm`}
									>
										<UnitedStateFlag />
										EEUU
									</button>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() => {}}
										className={` group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										<Image
											src={PeruFlag}
											alt="Peru Flag"
											width={20}
											height={20}
										/>
										PERÚ
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	);
}

export default ChangeCountry;
