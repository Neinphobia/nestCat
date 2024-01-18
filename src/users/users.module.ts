// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { Cat, CatSchema } from '../cats/cats.schema';
import { UserFavoriteCat, UserFavoriteCatSchema } from './user-favorite-cat.schema';
import { AuthService } from '../auth/auth.service'; // Import AuthService
import { JwtService } from '@nestjs/jwt'; // Import JwtService
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    MongooseModule.forFeature([{ name: UserFavoriteCat.name, schema: UserFavoriteCatSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService,JwtService], // Add AuthService to providers
  exports: [UsersService, MongooseModule, AuthService], // If needed
})
export class UsersModule {}
