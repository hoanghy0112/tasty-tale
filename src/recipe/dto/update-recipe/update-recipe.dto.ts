import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from '../create-recipe/create-recipe.dto';
import { UpdateIngredientDto } from './update-ingredient.dto';
import { UpdateStepDto } from './update-step.dto';

export class UpdateRecipeDto extends OmitType(PartialType(CreateRecipeDto), [
  'ingredients',
  'steps',
]) {
  ingredients: UpdateIngredientDto[];
  steps: UpdateStepDto[];
}
