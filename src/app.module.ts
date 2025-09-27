import { Module } from '@nestjs/common';
import { AppController, UserController } from './controllers';
import { AppService, FirebaseService } from './services';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
