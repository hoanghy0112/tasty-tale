import { BaseEntity } from 'src/common/entities/base.entity';
import { RecipeEntity } from 'src/recipe/entities/recipe.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'cookbook' })
export class CookbookEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @ManyToMany(() => RecipeEntity)
  @JoinTable()
  recipes: RecipeEntity[];
}
