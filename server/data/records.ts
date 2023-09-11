import { Record } from "../models/health-model";

export const Meals = [
  "breakfast",
  "lunch",
  "dinner",
  "snack1",
  "snack2",
  "snack3"
];

export interface MealTypes {
  breakfast: Record[];
  lunch: Record[];
  dinner: Record[];
  snack1: Record[];
  snack2: Record[];
  snack3: Record[];
}