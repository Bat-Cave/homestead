import type { Recipe } from "../types";
import { recipe as basicBread } from "./basic-bread";
import { recipe as brownies } from "./brownies";
import { recipe as butter } from "./butter";
import { recipe as buttermilkPancakes } from "./buttermilk-pancakes";
import { recipe as classicBakedCheesecake } from "./classic-baked-cheesecake";
import { recipe as homemadeChineseEggNoodles } from "./homemade-chinese-egg-noodles";
import { recipe as honeySoyChicken } from "./honey-soy-chicken";
import { recipe as honeySoySauce } from "./honey-soy-sauce";
import { recipe as jalapenoPoppers } from "./jalapeno-poppers";
import { recipe as salsa } from "./salsa";
import { recipe as stirFrySauce } from "./stir-fry-sauce";

export const allRecipes: Recipe[] = [
	basicBread,
	butter,
	brownies,
	classicBakedCheesecake,
	salsa,
	jalapenoPoppers,
	buttermilkPancakes,
	honeySoyChicken,
	honeySoySauce,
	homemadeChineseEggNoodles,
	stirFrySauce,
];
