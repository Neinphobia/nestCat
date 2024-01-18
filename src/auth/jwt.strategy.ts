// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key', // Same secret key as used in JwtModule
    });
  }

  async validate(payload: any) {
    // Validate the user based on the payload (e.g., retrieve user from database)
    console.log('Received token payload:', payload);
    return this.authService.validateUserById(payload.sub);
  }
}
