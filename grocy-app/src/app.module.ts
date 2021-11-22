import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SuppliersModule } from './offer.context/suppliers/suppliers.module';
import { CartModule } from "./shoppingcart.context/cart/cart.module";
import { PurchaseModule } from "./purchase/purchase.module";

@Module({
  imports: [
    PurchaseModule,
    TypeOrmModule.forRoot(),
    SuppliersModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
