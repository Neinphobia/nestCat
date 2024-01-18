import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from './users/users.module'

let username='furkangonulaldev'
let password='gnG4fsORJmumhGMn'

const uri = `mongodb+srv://${username}:${password}@cat.xmsqm.mongodb.net/catsCollection?retryWrites=true&w=majority`;




@Module({
  imports: [
    MongooseModule.forRoot(uri, {}),
    CatsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
