import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Footer from "../components/footer";
import { Navbar } from "../components/nav";
import "./globals.css";
import GradientBackground from "../components/gradient-background";
import { cn } from "../lib/utils";
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: "Recipes | Rico Hancock",
	description:
		"Favorite recipes from loved family members. I wanted to make these recipes digital so that I could easily access them and revise them when needed.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/images/icon.ico",
				href: "/images/icon.ico",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/images/icon-dark.ico",
				href: "/images/icon-dark.ico",
			},
		],
	},
	openGraph: {
		title: "Recipes | Rico Hancock",
		description:
			"Favorite recipes from loved family members. I wanted to make these recipes digital so that I could easily access them and revise them when needed.",
		siteName: "Recipes | Rico Hancock",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(GeistSans.variable, GeistMono.variable, "overflow-auto")}
		>
			<body className="antialiased overscroll-none">
				<Providers>
					<div className="w-full min-h-lvh relative">
						<GradientBackground>
							<div
								className="fixed w-lvw h-lvh opacity-30"
								style={{
									backgroundImage: `radial-gradient(rgba(69, 26, 3, .2) 2px, transparent 0)`,
									backgroundSize: "15px 15px",
									backgroundPosition: "-16.5px -16.5px",
									maskImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 1), transparent 75%)`,
								}}
							/>
							<div className="fixed w-lvw h-lvh flex items-center justify-center opacity-10">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									version="1.1"
									viewBox="0 0 2000 2000"
									className="w-lvw h-lvh invert dark:filter-none"
									preserveAspectRatio="xMinYMin slice"
								>
									<defs>
										<filter
											id="gggrain-filter"
											x="-20%"
											y="-20%"
											width="140%"
											height="140%"
											filterUnits="objectBoundingBox"
											primitiveUnits="userSpaceOnUse"
											colorInterpolationFilters="sRGB"
										>
											<feTurbulence
												type="fractalNoise"
												baseFrequency="0.45"
												numOctaves="1"
												seed="100"
												stitchTiles="stitch"
												x="0%"
												y="0%"
												width="100%"
												height="100%"
												result="turbulence"
											/>
											<feColorMatrix
												type="saturate"
												values="0"
												x="0%"
												y="0%"
												width="100%"
												height="100%"
												in="turbulence"
												result="colormatrix"
											/>
											<feComponentTransfer
												x="0%"
												y="0%"
												width="100%"
												height="100%"
												in="colormatrix"
												result="componentTransfer"
											>
												<feFuncR type="linear" slope="3" />
												<feFuncG type="linear" slope="3" />
												<feFuncB type="linear" slope="3" />
											</feComponentTransfer>
											<feColorMatrix
												x="0%"
												y="0%"
												width="100%"
												height="100%"
												in="componentTransfer"
												result="colormatrix2"
												type="matrix"
												values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 25 -15"
											/>
										</filter>
									</defs>
									<g>
										<rect
											width="100%"
											height="100%"
											fill="transparent"
											filter="url(#gggrain-filter)"
											opacity="0.2"
											style={{ mixBlendMode: "soft-light" }}
										/>
									</g>
								</svg>
							</div>
							<div className="relative z-10 w-full">
								<main
									id="main"
									className="min-w-0 min-h-lvh flex flex-col px-2 md:px-0 mx-2 lg:mx-auto pt-12"
								>
									<Navbar />
									{children}
									<Footer />
								</main>
							</div>
						</GradientBackground>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="0"
						height="0"
						fill="none"
					>
						<mask
							id="masking"
							maskUnits="objectBoundingBox"
							maskContentUnits="objectBoundingBox"
						>
							<rect fill="url(#gradient-fill)" width="1" height="1" />
						</mask>
						<defs>
							<linearGradient
								id="gradient-fill"
								x1="0"
								y1="00%"
								x2="0"
								y2="100%"
								rotate="90"
							>
								<stop offset="0" stopColor="#ffffff" />

								<stop offset="1" stopColor="#000000" />
							</linearGradient>
						</defs>
					</svg>
				</Providers>
			</body>
		</html>
	);
}
