import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any  {
    return {
      hello:"hello"
    };
  }
  getHi(): string {
    return 'hiii';
  }
}
