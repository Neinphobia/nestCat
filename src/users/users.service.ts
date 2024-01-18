import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { Cat } from '../cats/cats.schema';
import { UserFavoriteCat } from './user-favorite-cat.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserFavoriteCat.name) private userFavoriteCatModel: Model<UserFavoriteCat>,
    @InjectModel(Cat.name) private catModel: Model<Cat>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
  async isUsernameExists(username: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ username }).exec();
    return !!existingUser;
  }
  
  async isEmailExists(email: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    return !!existingUser;
  }

  async create(user: Partial<User>): Promise<User> {
    // Hash and salt the user's password
    const hashedPassword = await bcrypt.hash(user.password, 10);
  
    const createdUser = new this.userModel({ ...user, password: hashedPassword });
    await createdUser.save();
  
    // Retrieve the user from the database without the password
    const resultUser = await this.userModel.findById(createdUser._id).select('-password').exec();
    return resultUser;
  }
  

  async addFavoriteCat(userId: string, catId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    const cat = await this.catModel.findById(catId).exec();
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${catId} not found`);
    }
  
    // Check if the cat is already a favorite
    const isCatAlreadyFavorited = user.favoriteCats.some(
      (favoriteCat) => favoriteCat.favoriteCat.toString() === catId,
    );
  
    if (isCatAlreadyFavorited) {
      // Optionally handle the case where the cat is already favorited
      // For now, we'll return the user as is
      console.log('You have already favorited this cat :)')
      const resultUser = await this.userModel.findById(user._id).select('-password').exec();
      return resultUser;
    }

   
    const favoriteCat = new this.userFavoriteCatModel({ user: userId, favoriteCat: catId });
    await favoriteCat.save();
  
    user.favoriteCats.push(favoriteCat);
    await user.save();
    const resultUser = await this.userModel.findById(user._id).select('-password').exec();
    return resultUser;
  }
  ///
  // async getFavoriteCats(userId: string): Promise<User> {
  //   const user = await this.userModel.findById(userId).populate('favoriteCats.favoriteCat').exec();
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   return user;
  // }
  async getAllFavoriteCats(): Promise<{ userId: string; userName: string; favoriteCats: Cat[] }[]> {
    const allFavoriteCats = await this.userFavoriteCatModel
      .find()
      .populate('user', 'username') // Only include the username field
      .populate('favoriteCat')
      .exec();
  
    const result = allFavoriteCats.reduce((accumulator, favoriteCat) => {
      const { _id: userId, username: userName } = favoriteCat.user;
      const existingUser = accumulator.find((item) => item.userId === userId);
  
      if (existingUser) {
        existingUser.favoriteCats.push(favoriteCat.favoriteCat);
      } else {
        accumulator.push({
          userId,
          userName,
          favoriteCats: [favoriteCat.favoriteCat],
        });
      }
  
      return accumulator;
    }, []);
  
    return result;
  }
  
}
