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
				d="M592 221H424L214 783L298 867L403 586H651L544 867H664L874 305L790 221L683 502L434 501.943L508 305.115H676L592 221Z"
				fill="currentColor"
				stroke="currentColor"
				// variants={{ hover: { fillOpacity: 1 }, initial: { fillOpacity: 0.2 } }}
				transition={{ duration: 0.5 }}
			/>
		</motion.svg>
	);
}
