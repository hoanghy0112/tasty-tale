import { BaseEntity } from 'src/common/entities/base.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { RecipeEntity } from 'src/recipe/entities/recipe.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  displayname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false })
  googleId: string;

  @ManyToMany(() => GroupEntity, (group) => group.users)
  groups: GroupEntity[];

  @ManyToMany(() => RecipeEntity, (recipe) => recipe.likedUsers)
  @JoinTable()
  likes: RecipeEntity[];
}
