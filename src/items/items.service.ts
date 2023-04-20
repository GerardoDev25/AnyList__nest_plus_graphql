import { Injectable } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  async create(createItemInput: CreateItemInput): Promise<Item> {
    return 'This action adds a new item';
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
