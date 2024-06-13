import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { In, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe/update-recipe.dto';
import { RecipeEntity } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  create(createRecipeDto: CreateRecipeDto & { user: UserDto }) {
    return this.recipeRepository.save(createRecipeDto);
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto, userDto: UserDto) {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (recipe.user.id != userDto.id) throw new ForbiddenException();

    Object.assign(recipe, updateRecipeDto);
    return this.recipeRepository.save(recipe);
  }

  findById(id: string) {
    return this.recipeRepository.findOne({
      where: { id },
      relations: {
        ingredients: true,
        steps: {
          images: true,
        },
        user: true,
      },
    });
  }

  findByIds(ids: string[]) {
    return this.recipeRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  remove(id: string) {
    return this.recipeRepository.softDelete({ id });
  }
}
