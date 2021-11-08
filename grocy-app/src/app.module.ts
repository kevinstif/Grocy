import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchaseModule } from "./purchase/purchase.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    PurchaseModule,TypeOrmModule.forRoot(),
    SuppliersModule, TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
