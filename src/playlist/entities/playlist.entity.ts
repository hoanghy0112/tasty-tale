import { BaseEntity } from 'src/common/entities/base.entity';
import { RecipeEntity } from 'src/recipe/entities/recipe.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'playlist' })
export class PlaylistEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToMany(() => RecipeEntity)
  @JoinTable()
  recipes: RecipeEntity[];

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
