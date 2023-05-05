import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { ItemsModule } from 'src/items/items.module';
import { ListModule } from 'src/list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ItemsModule, ListModule],
  providers: [UsersResolver, UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
