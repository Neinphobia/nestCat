import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

let username='furkangonulaldev'
let password='gnG4fsORJmumhGMn'

const uri = `mongodb+srv://${username}:${password}@cat.xmsqm.mongodb.net/catsCollection?retryWrites=true&w=majority`;




@Module({
  imports: [
    UsersModule,
    CatsModule,
    MongooseModule.forRoot(uri, {}),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, JwtStrategy, AuthService, UsersService, JwtAuthGuard],
})
export class AppModule {}