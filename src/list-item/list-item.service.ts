import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { ListItem } from './entities/list-item.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { List } from 'src/list/entities/list.entity';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemsRepository: Repository<ListItem>,
  ) {}

  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {
    const { itemId, listId, ...rest } = createListItemInput;

    const newListItem = this.listItemsRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });

    return this.listItemsRepository.save(newListItem);
  }

  async findAll(
    list: List,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.listItemsRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"listId" = :listId`, { listId: list.id });

    if (search) {
      queryBuilder.andWhere('LOWER(name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<ListItem> {
    const listItem = await this.listItemsRepository.findOneBy({ id });

    if (!listItem) {
      throw new NotFoundException(`list item with id:${id} not found`);
    }

    return listItem;
  }

  update(id: number, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }

  async countListItemByList(list: List): Promise<number> {
    return this.listItemsRepository.count({
      where: {
        list: { id: list.id },
      },
    });
  }
}
