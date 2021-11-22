import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from "./shoppingcart.context/cart/cart.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [CartModule,TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
