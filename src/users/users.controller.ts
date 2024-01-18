import { Controller, Get, Post, Body, Param,Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }
  //used query strings for nicer approach to the data
  @Post('favoriteCats')
  async addFavoriteCat(
    @Query('userId') userId: string,
    @Query('catId') catId: string,
  ): Promise<User> {
    return this.usersService.addFavoriteCat(userId, catId);
  }
}
