"use client";
import { motion, type SVGMotionProps } from "motion/react";

export default function Logo({
	width = 64,
	...props
}: SVGMotionProps<SVGSVGElement>) {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1088 1088"
			fill="none"
			width={width}
			initial="initial"
			whileHover="hover"
			{...props}
		>
			<title>Rico Hancock Logo</title>
			<motion.path
				d="M589.5 263.5H477.565C467.594 263.5 458.661 269.665 455.125 278.988L362 524.5M263 785.5L362 524.5M362 524.5H734M734 524.5L634 785.5M734 524.5L836 263.5"
				stroke="url(#paint0_linear_295_2)"
				strokeWidth="112"
				strokeLinecap="round"
				// variants={{ hover: { fillOpacity: 1 }, initial: { fillOpacity: 0.2 } }}
				transition={{ duration: 0.5 }}
			/>
			<defs>
				<linearGradient
					id="paint0_linear_295_2"
					x1="643.5"
					y1="263"
					x2="440.5"
					y2="840.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#16A34A" />
					<stop offset="1" stopColor="#16A34A" />
				</linearGradient>
			</defs>
		</motion.svg>
	);
}
