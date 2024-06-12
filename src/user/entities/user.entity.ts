import { BaseEntity } from 'src/common/entities/base.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  displayname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  googleId: string;

  @ManyToMany(() => GroupEntity, (group) => group.users)
  groups: GroupEntity[];
}
