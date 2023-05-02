import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SEED_USERS } from './data/data-seed';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
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
    console.log(user);

    // ! crear items

    return true;
  }

  async deleteDatabas() {
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
}
