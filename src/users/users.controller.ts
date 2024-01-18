import { Controller, Get, Post, Body, Param,Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { Cat } from 'src/cats/cats.schema';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
 @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    // This route is protected by the JWT strategy; it will return the user's profile
    return { message: 'You have accessed a protected route!' };
  }
  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    // Check if the username or email already exists
    const isUsernameExists = await this.usersService.isUsernameExists(userData.username);
    const isEmailExists = await this.usersService.isEmailExists(userData.email);

    if (isUsernameExists) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    if (isEmailExists) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

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


  @Get('favoriteCats')
  async getAllFavoriteCats(): Promise<{ userId: string; userName: string; favoriteCats: Cat[] }[]> {
    return this.usersService.getAllFavoriteCats();
  }
}
