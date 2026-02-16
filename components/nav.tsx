"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import ThemeSwitch from "./theme-switcher";

type NavItem = {
	name: string;
	hideOnMobile?: boolean;
};

const navItems: Record<string, NavItem> = {
	"/recipes": {
		name: "Recipes",
	},
	"/garden": {
		name: "Garden",
	},
};

export function Navbar() {
	const { resolvedTheme } = useTheme();
	const { scrollY } = useScroll();
	const springScrollY = useSpring(scrollY, { bounce: 0, duration: 0.3 });
	const background = useTransform(
		springScrollY,
		[0, 50],
		[
			"rgba(0,0,0,0)",
			resolvedTheme === "dark" ? "rgba(0,0,0,.7)" : "rgba(255,255,255,.7)",
		],
	);
	const backdropFilter = useTransform(
		springScrollY,
		[0, 50],
		["blur(0)", "blur(4px)"],
	);

	return (
		<motion.aside
			style={{ background, backdropFilter }}
			className={cn(
				"sticky top-4 w-[calc(100%+24px)] px-3 sm:w-full z-20 max-w-2xl rounded-lg h-12 tracking-tight mb-16 backdrop-blur-sm mx-auto -translate-x-3 sm:translate-x-0",
			)}
		>
			<nav
				className="flex flex-row items-start relative px-0 pb-0 fade max-w-xl mx-auto md:overflow-auto scroll-pr-6 md:relative"
				id="nav"
			>
				<div className="flex justify-between gap-3 items-center w-full">
					<Link href="/" className="shrink-0 -ml-2">
						<Logo width={48} />
						<span className="sr-only">Home</span>
					</Link>
					<div className="flex space-x-1 items-center">
						{Object.entries(navItems).map(
							([path, { name, hideOnMobile = false }]) => {
								return (
									<Link
										key={path}
										href={path}
										className={cn(
											"transition-all text-sm md:text-base hover:text-neutral-800 dark:hover:text-neutral-200 hover:underline flex align-middle relative py-1 px-2 m-1",
											hideOnMobile && "hidden md:block",
										)}
									>
										{name}
									</Link>
								);
							},
						)}
						<ThemeSwitch />
					</div>
				</div>
			</nav>
		</motion.aside>
	);
}
