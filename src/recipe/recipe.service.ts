import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { ILike, In, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe/update-recipe.dto';
import { RecipeEntity } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    private readonly userService: UserService,
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

  async like(recipeId: string, userId: string) {
    const recipe = await this.recipeRepository.findOneBy({ id: recipeId });
    const user = await this.userService.findById(userId, { likes: true });

    user.likes = [
      ...user.likes.filter((like) => like.id !== recipe.id),
      recipe,
    ];

    await this.userService.update(user);

    return user.likes.length;
  }

  async unlike(recipeId: string, userId: string) {
    const recipe = await this.recipeRepository.findOneBy({ id: recipeId });
    const user = await this.userService.findById(userId, { likes: true });

    user.likes = [...user.likes.filter((like) => like.id !== recipe.id)];

    await this.userService.update(user);

    return user.likes.length;
  }

  async findRandom(quantity: number = 3) {
    const results = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'image')
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.likedUsers', 'likedUsers')
      .leftJoinAndSelect('recipe.reviews', 'reviews')
      .leftJoinAndSelect('recipe.user', 'user')
      .orderBy('RANDOM()')
      .limit(quantity)
      .getMany();

    return results.map((result) => this.transform(result));
  }

  async findByName(name: string) {
    const results = await this.recipeRepository.find({
      where: { title: ILike(`%${name}%`) },
      relations: {
        images: true,
        ingredients: true,
        steps: {
          images: true,
        },
        user: true,
        likedUsers: true,
        reviews: true,
      },
    });
    return results.map((result) => this.transform(result));
  }

  async findOwnRecipe(id: string) {
    const results = await this.recipeRepository.find({
      where: { user: { id } },
      relations: {
        images: true,
        likedUsers: true,
        reviews: true,
      },
    });
    return results.map((result) => this.transform(result));
  }

  async findById(id: string) {
    const result = await this.recipeRepository.findOne({
      where: { id },
      relations: {
        images: true,
        ingredients: true,
        steps: {
          images: true,
        },
        user: true,
        likedUsers: true,
        reviews: true,
      },
    });
    return this.transform(result);
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

  transform(recipe: RecipeEntity) {
    return {
      ...recipe,
      likes: recipe.likedUsers.length,
      reviewNum: recipe.reviews.length,
      averageRating:
        recipe.reviews.reduce((total, review) => total + review.rating, 0) /
        (recipe.reviews.length || 1),
      likedUsers: undefined,
      reviews: undefined,
    };
  }
}
