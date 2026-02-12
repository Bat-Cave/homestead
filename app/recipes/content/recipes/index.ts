import type { Recipe } from "../types";
import { recipe as basicBread } from "./basic-bread";
import { recipe as butter } from "./butter";
import { recipe as buttermilkPancakes } from "./buttermilk-pancakes";
import { recipe as homemadeChineseEggNoodles } from "./homemade-chinese-egg-noodles";
import { recipe as honeySoyChicken } from "./honey-soy-chicken";
import { recipe as jalapenoPoppers } from "./jalapeno-poppers";
import { recipe as salsa } from "./salsa";
import { recipe as stirFrySauce } from "./stir-fry-sauce";

export const allRecipes: Recipe[] = [
	basicBread,
	butter,
	salsa,
	jalapenoPoppers,
	buttermilkPancakes,
	honeySoyChicken,
	homemadeChineseEggNoodles,
	stirFrySauce,
];
