import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './entities/ingredient.entity';
import { RecipeEntity } from './entities/recipe.entity';
import { StepEntity } from './entities/step.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeEntity, IngredientEntity, StepEntity]),
    UserModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
