import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IngredientEntity } from './ingredient.entity';
import { StepEntity } from './step.entity';

@Entity({ name: 'recipe' })
export class RecipeEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false })
  timeToCook: number; // unit: minutes

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.recipe, {
    cascade: true,
  })
  ingredients: IngredientEntity[];

  @OneToMany(() => StepEntity, (step) => step.recipe, {
    cascade: true,
  })
  steps: StepEntity[];

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
