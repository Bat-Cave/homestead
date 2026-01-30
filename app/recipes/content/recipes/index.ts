import type { Recipe } from "../types";
import { recipe as basicBread } from "./basic-bread";
import { recipe as salsa } from "./salsa";
import { recipe as template } from "./template";

export const allRecipes: Recipe[] = [basicBread, salsa, template];
