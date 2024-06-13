import { BaseEntity } from 'src/common/entities/base.entity';
import { ImageEntity } from 'src/image/entities/image.entity';
import { RecipeEntity } from 'src/recipe/entities/recipe.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  @Column()
  content: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => RecipeEntity)
  recipe: RecipeEntity;

  @ManyToMany(() => ImageEntity)
  @JoinTable()
  images: ImageEntity[];
}
