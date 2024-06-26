import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/request.type';
import { CreateRecipeDto } from './dto/create-recipe/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe/update-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('/v1/recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.recipeService.create({ ...createRecipeDto, user: req.user });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.recipeService.update(id, updateRecipeDto, req.user);
  }

  @Get()
  async findByName(@Query('name') name: string) {
    return this.recipeService.findByName(name);
  }

  @Get('random')
  findRandom(@Param('quantity') quantity: number) {
    return this.recipeService.findRandom(quantity);
  }

  @Get('own')
  @UseGuards(JwtAuthGuard)
  async findMyRecipe(@Request() request: AuthenticatedRequest) {
    return this.recipeService.findOwnRecipe(request.user.id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.recipeService.findById(id);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async like(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequest,
  ) {
    const likes = await this.recipeService.like(id, request.user.id);
    return { likes };
  }

  @Post(':id/unlike')
  @UseGuards(JwtAuthGuard)
  async unlike(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequest,
  ) {
    const likes = await this.recipeService.unlike(id, request.user.id);
    return { likes };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
