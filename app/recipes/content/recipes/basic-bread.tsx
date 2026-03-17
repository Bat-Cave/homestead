import { ReactiveIngredient, ReactiveServings } from "@/components/ingredients";
import { RecipeTemperature } from "@/components/recipe-temperature";
import { RecipeTime } from "@/components/recipe-time";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Video from "@/components/video";
import type { Recipe } from "../types";

const slug = "basic-bread";
const servings = 5;
const servingUnits: [string, string] = ["loaf", "loaves"];

const ingredients = [
	{ name: "really warm water", quantity: 6, unit: "cup" as const },
	{
		name: "canola oil",
		quantity: 0.6667,
		unit: "cup" as const,
		alternatives: ["olive oil"],
	},
	{ name: "honey", quantity: 0.6667, unit: "cup" as const },
	{ name: "salt", quantity: 2, unit: "tbsp" as const },
	{ name: "instant yeast", quantity: 3, unit: "tbsp" as const },
	{ name: "white flour", quantity: 8, unit: "cup" as const },
	{ name: "additional flour", quantity: 1, unit: "as needed" as const },
];

export const recipe: Recipe = {
	slug,
	title: "Basic Bread",
	publishedAt: "2026-01-26T18:43:01.721776Z",
	category: "breads",
	revisedFrom: "basic whole wheat bread",
	acknowledgments: ["Aunt Em", "Mom", "Jorden"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 20,
	cookTime: "100-145",
	steps: [
		<span key="combine-ingredients">
			Combine <strong>first 5 ingredients</strong> and{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={5}
				servings={servings}
				quantity={2}
				ingredients={ingredients}
			/>{" "}
			into a mixing bowl and spin breifly.
		</span>,
		<span key="let-sit">
			Let sit for{" "}
			<RecipeTime
				time={10}
				step={{ number: "3", name: "Let sit for 10 minutes" }}
				range={undefined}
			/>
			.
		</span>,
		<span key="start-mixing">
			Start mixing again while adding the remaining flour,{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={5}
				servings={servings}
				quantity={2}
				omitName
				ingredients={ingredients}
			/>{" "}
			at a time.
		</span>,
		"Continue adding flour until you can see the sides pull clean, as well as the dough coming clean from the bottom of the bowl.",
		<span key="dough-consistency">
			The dough should be very sticky and does not come together at this point,
			but the bowl is clean.
			<Collapsible key="collapsible-7">
				<CollapsibleTrigger className="text-sm underline text-violet-800/70 dark:text-violet-400/70 hover:text-violet-800 dark:hover:text-violet-400">
					See Dough Consistency
				</CollapsibleTrigger>
				<CollapsibleContent className="collapsible-content">
					Thank you <strong>Jorden</strong> and <strong>Mom</strong> for the
					video!
					<Video playbackId="WTLiiYpW5ZIrI100t01h2ktmDVBNJCejzv7a202VYneugs" />
				</CollapsibleContent>
			</Collapsible>
		</span>,
		<span key="knead-dough">
			Knead the dough for{" "}
			<RecipeTime
				step={{
					number: "7",
					name: "Knead the dough for 10 minutes or until the gluten has been developed.",
				}}
				time={10}
				range={undefined}
			/>{" "}
			or until the gluten has been developed. If the dough starts sticking,
			simply add a little white flour to take up the moisture.
		</span>,
		<span key="cover-mixer">
			Cover the mixer with a towel and let the dough rise for{" "}
			<RecipeTime
				time={undefined}
				step={{
					number: "8",
					name: "Cover the mixer with a towel and let the dough rise for 20-30 minutes in mixer.",
				}}
				range={[20, 30]}
			/>{" "}
			in mixer.
		</span>,
		"Uncover dough, oil hands and counter, and remove dough from the mixer.",
		<span key="divide-into-loaves">
			Divide into{" "}
			<ReactiveServings
				slug={slug}
				servings={servings}
				servingUnits={servingUnits}
			/>
			.
		</span>,
		<span key="shape-loaves">
			Shape loaves and place in well-greased/sprayed pans.{" "}
			<em>
				(If using oil, use your finger to spread a thin layer of oil on the
				walls and bottom of the pan.)
			</em>
		</span>,
		<span key="cover-with-towel">
			Cover with a dry towel and let rise until dough has risen double or
			approximately 2 inches above the pan. (
			<RecipeTime
				time={undefined}
				step={{
					number: "12",
					name: "Cover with a dry towel and let rise until dough has risen double or approximately 2 inches above the pan.",
				}}
				range={[30, 60]}
			/>
			)
		</span>,
		<span key="bake-in-oven">
			Bake in preheated oven at <RecipeTemperature temperature={325} /> for{" "}
			<RecipeTime
				time={undefined}
				step={{
					number: "13",
					name: "Bake in preheated oven at 325°F for 30-35 minutes.",
				}}
				range={[30, 35]}
			/>
			.
		</span>,
		"Cool on cooling racks.",
		"Butter tops while still warm.",
	],
};
