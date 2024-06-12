import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RecipeEntity } from './recipe.entity';

@Entity({ name: 'ingredient' })
export class IngredientEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  quantity: string;

  @Column({ type: 'varchar', nullable: false })
  item: string;

  @ManyToOne(() => RecipeEntity)
  recipe: RecipeEntity;
}
