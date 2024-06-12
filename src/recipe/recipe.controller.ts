import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/request.type';
import { CreateRecipeDto } from './dto/create-recipe/create-recipe.dto';
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

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.recipeService.findByid(id);
  }
}
