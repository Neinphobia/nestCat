// src/auth/auth.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }): Promise<{ accessToken: string }> {
    // Validate user credentials and generate a JWT token
    const user = await this.authService.validateUserByCredentials(credentials.username, credentials.password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token
    const accessToken = this.authService.generateAccessToken(user._id,user.password);

    return { accessToken };
  }
}
