import { Module } from '@nestjs/common';
import { CookbookService } from './cookbook.service';
import { CookbookController } from './cookbook.controller';
import { CookbookEntity } from './entities/cookbook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([CookbookEntity]), RecipeModule],
  controllers: [CookbookController],
  providers: [CookbookService],
})
export class CookbookModule {}
