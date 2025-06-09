import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './interfaces/users.controller';
import { UsersService } from './application/users.service';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { UsersRepositoryImpl } from './infrastructure/users.repository';
import { CustomerSchema } from './infrastructure/schemas/customer.schema';
import { ManagerSchema } from './infrastructure/schemas/manager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
        discriminators: [
          {
            name: 'manager',
            schema: ManagerSchema,
          },
          {
            name: 'customer',
            schema: CustomerSchema,
          },
        ],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryImpl,
    },
  ],
  exports: ['UsersRepository'],
})
export class UsersModule {}
