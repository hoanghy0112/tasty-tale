import { CreateImageDto } from 'src/image/dto/create-image.dto';
import { CreateIngredientDto } from './create-ingredient.dto';
import { CreateStepDto } from './create-step.dto';

export class CreateRecipeDto {
  title: string;
  description: string;
  timeToCook: number; // unit: minutes

  images: CreateImageDto[];
  ingredients: CreateIngredientDto[];
  steps: CreateStepDto[];
}
