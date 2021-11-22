import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterCartRequestDto } from "../dtos/request/register-cart-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { RegisterCartResponseDto } from "../dtos/response/register-cart-response.dto";
import { RegisterCartValidator } from "../validators/register-cart.validator";
import { CommandBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { CartSchema } from "../../infrastructure/persistence/schemas/cart.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { EditCartRequestDto } from "../dtos/request/edit-cart-request.dto";
import { Cart } from "../../domain/entities/cart";

@Injectable()
export class CartApplicationServices {

  constructor(
    private commandBus:CommandBus,
    private registerCartValidator:RegisterCartValidator,
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

  async Create(registerCartRequestDto:RegisterCartRequestDto):Promise<Result<AppNotification, RegisterCartResponseDto>>{
    const notification:AppNotification=await this.registerCartValidator.validate(registerCartRequestDto);

    if (notification.hasErrors()){
      return Result.error(notification);
    }
    const insertResult= await this.cartRepository.insert(registerCartRequestDto as any);
    const cartId:number=Number(insertResult.identifiers[0].id);
    const registerCartResponseDto:RegisterCartResponseDto= new RegisterCartResponseDto(
      cartId,
      registerCartRequestDto.customerId,
      registerCartRequestDto.productId,
      registerCartRequestDto.quantity,
      registerCartRequestDto.creationDate,
      registerCartRequestDto.state
    );
    return Result.ok(registerCartResponseDto);
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
