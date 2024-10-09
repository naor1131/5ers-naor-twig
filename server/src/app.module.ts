import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StockModule } from './stocks/stocks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://temp-user:1234@corejet.ek0bg.mongodb.net/5ers?retryWrites=true&w=majority&appName=CoreJet',
    ),
    UserModule,
    StockModule,
  ],
})
export class AppModule {}
