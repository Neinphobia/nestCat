import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
  
  async create(catData: Partial<Cat>): Promise<Cat> {
    const createdCat = new this.catModel(catData);
    return createdCat.save();
  }
  async update(id: string, catData: Partial<Cat>): Promise<Cat> {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, catData, { new: true });
    if (!updatedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return updatedCat;
  }

  async remove(id: string): Promise<any> {
    const deletedCat = await this.catModel.findByIdAndDelete(id);
    if (!deletedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    const result = {
      deleted:true,
      data:deletedCat
    }
    return result;
  }
}
