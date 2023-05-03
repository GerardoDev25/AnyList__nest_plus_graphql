import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination-args';

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

  async findAll(user: User, paginationArgs: PaginationArgs): Promise<Item[]> {
    const { limit, offset } = paginationArgs;

    return this.itemRepository.find({
      take: limit,
      skip: offset,
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string, user: User): Promise<Item> {
    const item = await this.itemRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!item) {
      throw new NotFoundException(`item with id: "${id}" not found`);
    }
    return item;
  }

  async update(
    id: string,
    updateItemInput: UpdateItemInput,
    user: User,
  ): Promise<Item> {
    await this.findOne(id, user);
    const item = await this.itemRepository.preload(updateItemInput);

    return this.itemRepository.save(item);
  }

  async remove(id: string, user: User): Promise<Item> {
    // todo soft delete integration referencial
    const item = await this.findOne(id, user);
    await this.itemRepository.remove(item);
    return { ...item, id };
  }

  async itemCountByUser(user: User): Promise<number> {
    return this.itemRepository.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
}
