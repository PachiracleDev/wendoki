import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsShop } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { GiClothes } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import logoImage from "../../../public/logo.png";

function Navbar() {
	return (
		<div className="flex items-center sm:px-8 md:px-14 lg:px-24 xl:p-5 shadow-lg xl:px-32 lg:py-3 justify-between p-2 sticky top-0 w-full z-50 bg-gradient-to-r from-primary via-primary/60 to-primary text-white">
			<Link href="/">
				<div className="flex items-center">
					<Image src={logoImage} alt="logo" width={40} height={40} />
					<span className="font-bold lexend text-xl">en</span>
				</div>
			</Link>

			<div className="flex items-center gap-8">
				<div className="hidden lg:block">
					<nav>
						<ul className="flex gap-6 text-sm">
							<li>
								<Link
									href="/"
									className="flex hover:text-gray-200 transition-colors duration-300 items-center gap-2"
								>
									<AiFillHome size={27} />
									INICIO
								</Link>
							</li>
							<li>
								<Link
									href="/productos"
									className="flex hover:text-gray-200 transition-colors duration-300 items-center gap-2"
								>
									<BsShop size={22} />
									TIENDA
								</Link>
							</li>
							<li>
								<Link
									href="/ubicanos"
									className="flex hover:text-gray-200  transition-colors duration-300 items-center gap-2  "
								>
									<FaMapMarkerAlt size={22} />
									UBICANOS
								</Link>
							</li>
							<li>
								<Link
									href="/nosotros"
									className="flex hover:text-gray-200 transition-colors duration-300 items-center gap-2"
								>
									<HiOutlineUserGroup size={22} />
									NOSOTROS
								</Link>
							</li>
						</ul>
					</nav>
				</div>

				<div className="flex gap-5 items-center">
					<Link href="/productos">
						<div className="flex flex-col lg:hidden gap-1 text-xs items-center">
							<BsShop className="cursor-pointer " size={22} />
							TIENDA
						</div>
					</Link>
					<Link href="/ubicanos">
						<div className="flex flex-col lg:hidden gap-1 text-xs items-center">
							<FaMapMarkerAlt className="cursor-pointer " size={22} />
							MAP
						</div>
					</Link>
					<Link href="/nosotros">
						<div className="flex flex-col lg:hidden gap-1 text-xs items-center">
							<HiOutlineUserGroup className="cursor-pointer " size={22} />
							NOSOTROS
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
