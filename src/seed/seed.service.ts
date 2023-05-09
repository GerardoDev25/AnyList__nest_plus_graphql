import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { SEED_ITEMS, SEED_USERS } from './data/data-seed';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/items.service';
import { List } from 'src/list/entities/list.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';
import { ListService } from 'src/list/list.service';
import { ListItemService } from 'src/list-item/list-item.service';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly userService: UsersService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly itemService: ItemsService,

    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    private readonly listService: ListService,

    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
    private readonly listItemService: ListItemService,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProd) {
      throw new UnauthorizedException('we cannot run SEED in prod');
    }
    // ! borrar base de datos
    await this.deleteDatabas();

    // ! crear usuarios
    const user = await this.loadUser();

    // ! crear items
    await this.loadItems(user);
    return true;
  }

  async deleteDatabas() {
    // !borrar listItems
    await this.listItemRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    // !borrar list
    await this.listRepository.createQueryBuilder().delete().where({}).execute();

    // !borrar items
    await this.itemRepository.createQueryBuilder().delete().where({}).execute();

    // !borrar user
    await this.userRepository.createQueryBuilder().delete().where({}).execute();
  }

  async loadUser(): Promise<User> {
    const users = [];
    for (const user of SEED_USERS) {
      users.push(await this.userService.create(user));
    }

    return users[0];
  }

  async loadItems(user: User): Promise<boolean> {
    const items = [];
    for (const item of SEED_ITEMS) {
      items.push(this.itemService.create(item, user));
    }

    await Promise.allSettled(items);

    return true;
  }
}
