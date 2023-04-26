import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enums';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as User;

    console.log(roles);
    if (!user) {
      throw new InternalServerErrorException(
        'no user inside the request - make sure that we used the AuthGuard',
      );
    }

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      // TODO eliminar valid role
      if (roles.includes(role as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `user: ${user.fullName} need a valid role : ${roles}`,
    );
  },
);
