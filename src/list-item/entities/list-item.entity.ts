import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Item } from 'src/items/entities/item.entity';
import { List } from 'src/list/entities/list.entity';

@Entity('list-items')
@ObjectType()
export class ListItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'numeric' })
  @Field(() => Number)
  quantity: number;

  @Column({ type: 'bool' })
  @Field(() => Boolean)
  completed: boolean;

  // list: List;

  // item: Item;
}
