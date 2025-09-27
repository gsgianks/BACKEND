import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(num): string {
    return `Hello World! ${num}`;
  }

  getUser(): string{
    return 'Método getUser';
  }

}
