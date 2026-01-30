import type { Recipe } from "../types";
import { recipe as basicBread } from "./basic-bread";
import { recipe as buttermilkPancakes } from "./buttermilk-pancakes";
import { recipe as jalapenoPoppers } from "./jalapeno-poppers";
import { recipe as salsa } from "./salsa";

export const allRecipes: Recipe[] = [
	basicBread,
	salsa,
	jalapenoPoppers,
	buttermilkPancakes,
];
