// src/auth/auth.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByCredentials(username: string, password: string): Promise<any> {
    // Validate user credentials and return the user if valid
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password || ''))) {
      return user;
    }

    return null;
  }
  async validateUserById(userId: string): Promise<any> {
    // Validate user by ID and return the user if found
    const user = await this.usersService.findById(userId);
    return user;
  }

  generateAccessToken(userId: string): string {
    // Generate and sign a JWT token
    return this.jwtService.sign({ sub: userId });
  }
}
