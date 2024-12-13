import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  updateAction(params) {
    const id = params.id;
    return {
      success: true,
      id,
    };
  }
}
