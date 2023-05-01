import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const newItem = this.itemRepository.create({ ...createItemInput, user });
    return await this.itemRepository.save(newItem);
  }

  async findAll(user: User): Promise<Item[]> {
    // todo filrar paginar etc

    return this.itemRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`item with id: "${id}" not found`);
    }
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    await this.findOne(id);
    const item = await this.itemRepository.preload(updateItemInput);

    return this.itemRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    // todo soft delete integration referencial
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
    return { ...item, id };
  }
}
