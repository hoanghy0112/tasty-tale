import { BaseEntity } from 'src/common/entities/base.entity';
import { ImageEntity } from 'src/image/entities/image.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { RecipeEntity } from './recipe.entity';

@Entity({ name: 'step' })
export class StepEntity extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  order: number;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @ManyToOne(() => RecipeEntity)
  recipe: RecipeEntity;

  @ManyToMany(() => ImageEntity, { cascade: true })
  @JoinTable()
  images: ImageEntity[];
}
