import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ManyToOne,
  Index,
  Column,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.lists, {
    nullable: false,
    lazy: true,
  })
  @Index('userId-list-index')
  @Field(() => User)
  user: User;
}
