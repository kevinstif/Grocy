import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterCartRequestDto } from "../dtos/request/register-cart-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { RegisterCartResponseDto } from "../dtos/response/register-cart-response.dto";
import { RegisterCartValidator } from "../validators/register-cart.validator";
import { CommandBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { CartSchema } from "../../infrastructure/persistence/typeorm/entities/cart.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { EditCartRequestDto } from "../dtos/request/edit-cart-request.dto";
import { Cart } from "../../domain/entities/cart";
import { RegisterCartCommand } from "../../messages/commands/register-cart-command";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { RegisterPaymentRequestDto } from "../dtos/request/register-payment-request.dto";
import { RegisterPaymentValidator } from "../validators/register-payment.validator";
import { MakePaymentCommand } from "../../messages/commands/make-payment.command";
import { RegisterPaymentResponseDto } from "../dtos/response/register-payment-response.dto";

@Injectable()
export class CartApplicationServices {

  constructor(
    private commandBus:CommandBus,
    private registerCartValidator:RegisterCartValidator,
    private registerPaymentValidator:RegisterPaymentValidator,
    @InjectRepository(CartSchema)
    private readonly cartRepository:Repository<Cart>,
  ) {}

  async GetAll(){
    return await this.cartRepository.find();
  }

  async GetById(id: number){

   const cart = await this.cartRepository.findOne(id);
   if(!cart) throw new NotFoundException('Not found');
   return cart;
  }

  async Create(registerCartRequestDto:RegisterCartRequestDto)
    :Promise<Result<AppNotification, RegisterCartResponseDto>>{

    const notification:AppNotification=await this.registerCartValidator.validate(registerCartRequestDto);

    if (notification.hasErrors()){
      return Result.error(notification);
    }

    const date=DateTime.utcNow()

    const registerCartCommand= new RegisterCartCommand(
      registerCartRequestDto.customerId,
      registerCartRequestDto.quantity,
      date,
      registerCartRequestDto.state
    )

    const cartId= await this.commandBus.execute(registerCartCommand)
    const registerCartResponseDto:RegisterCartResponseDto= new RegisterCartResponseDto(
      cartId,
      registerCartRequestDto.customerId,
      registerCartRequestDto.quantity,
      date.getDate().toString(),
      registerCartRequestDto.state
    );
    return Result.ok(registerCartResponseDto);
  }

  async Paid(registerPaymentRequestDto:RegisterPaymentRequestDto)
    :Promise<Result<AppNotification, RegisterPaymentResponseDto>>{

    const notification:AppNotification=await this.registerPaymentValidator.validate(registerPaymentRequestDto);

    if (notification.hasErrors()){
      return Result.error(notification);
    }

    const date=DateTime.utcNow()

    const makePaymentCommand= new MakePaymentCommand(
      registerPaymentRequestDto.customerId,
      registerPaymentRequestDto.cartId,
      registerPaymentRequestDto.price,
      date
    )

    const cartId= await this.commandBus.execute(makePaymentCommand)
    const registerPaymentResponseDto:RegisterPaymentResponseDto= new RegisterPaymentResponseDto(
      cartId,
      registerPaymentRequestDto.customerId,
      registerPaymentRequestDto.cartId,
      registerPaymentRequestDto.price,
      date.getDate().toString(),
    );
    return Result.ok(registerPaymentResponseDto);
  }

  async Update(id: number,editCartRequestDto:EditCartRequestDto){
    const cart = await this.cartRepository.findOne(id);
    if(!cart) throw new NotFoundException('Not found');
    const editedCart=Object.assign(cart,editCartRequestDto);
    return this.cartRepository.save(editedCart);
  }
  async Delete(id: number){
    const cart = await this.cartRepository.findOne(id);
    if(!cart) throw new NotFoundException('Not found');
    return this.cartRepository.delete(id);
  }
}
