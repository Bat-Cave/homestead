"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import {
	AnimatePresence,
	motion,
	MotionConfig,
	type Variants,
} from "motion/react";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	// eslint-disable-next-line react-hooks/set-state-in-effect
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<MotionConfig transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
			<div className="size-8 relative overflow-hidden">
				<AnimatePresence mode="popLayout">
					{!mounted && (
						<motion.div
							variants={buttonVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							whileHover="anticipate"
							className="absolute inset-0 flex items-center justify-center"
						>
							<Image
								src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
								width={32}
								height={32}
								sizes="32x32"
								alt="Loading Light/Dark Toggle"
								priority={false}
								title="Loading Light/Dark Toggle"
								className="w-full h-full"
							/>
						</motion.div>
					)}
					{resolvedTheme === "dark" && mounted ? (
						<motion.button
							key="dark"
							variants={buttonVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							whileHover="anticipate"
							onClick={() => {
								setTheme("light");
							}}
							className="absolute inset-0 flex items-center justify-center"
						>
							<Moon />
						</motion.button>
					) : null}
					{resolvedTheme === "light" && mounted ? (
						<motion.button
							key="light"
							variants={buttonVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							whileHover="anticipate"
							onClick={() => {
								setTheme("dark");
							}}
							className="absolute inset-0 flex items-center justify-center"
						>
							<Sun />
						</motion.button>
					) : null}
				</AnimatePresence>
			</div>
		</MotionConfig>
	);
}

const buttonVariants: Variants = {
	initial: {
		rotate: -90,
		scale: 0,
		y: "100%",
	},
	anticipate: {
		rotate: 30,
	},
	animate: {
		rotate: 0,
		scale: 1,
		y: "0%",
	},
	exit: {
		rotate: -90,
		scale: 0,
		y: "100%",
	},
};
