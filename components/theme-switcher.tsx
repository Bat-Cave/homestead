"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
	AnimatePresence,
	LazyMotion,
	MotionConfig,
	domAnimation,
	m,
	type Variants,
} from "motion/react";

export default function ThemeSwitch() {
	const { setTheme, resolvedTheme } = useTheme();
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);
	const isDark = resolvedTheme === "dark";

	return (
		<LazyMotion features={domAnimation}>
			<MotionConfig transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
				<div
					className="size-8 relative overflow-hidden"
					suppressHydrationWarning
				>
					<AnimatePresence mode="popLayout">
						{(!mounted || !resolvedTheme) && (
							<m.div
								key="loading"
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
							</m.div>
						)}
						{mounted && resolvedTheme && (
							<m.button
								key={isDark ? "dark" : "light"}
								variants={buttonVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								whileHover="anticipate"
								onClick={() => {
									setTheme(isDark ? "light" : "dark");
								}}
								className="absolute inset-0 flex items-center justify-center"
							>
								{isDark ? <Moon /> : <Sun />}
							</m.button>
						)}
					</AnimatePresence>
				</div>
			</MotionConfig>
		</LazyMotion>
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
