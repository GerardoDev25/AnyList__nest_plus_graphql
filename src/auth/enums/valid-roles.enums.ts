import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  user = 'user',
  userUser = 'userUser',
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });
