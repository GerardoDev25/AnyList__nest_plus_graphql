import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListService } from './list.service';
import { ListResolver } from './list.resolver';
import { List } from './entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListResolver, ListService],
  exports: [ListService, TypeOrmModule],
})
export class ListModule {}
