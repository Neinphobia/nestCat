import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cats.schema';


//can define route inside of the controllers
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Post()
  async create(@Body() catData: Partial<Cat>): Promise<Cat> {
    return this.catsService.create(catData);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() catData: Partial<Cat>): Promise<Cat> {
    return this.catsService.update(id, catData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(id);
  }
}
