import { BaseEntity } from 'src/common/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'group' })
export class GroupEntity extends BaseEntity {
  @Column()
  displayname: string;

  @Column()
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable()
  users: UserEntity[];

  @ManyToOne(() => UserEntity)
  admin: UserEntity;
}
