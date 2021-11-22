import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterOrderRequestDto } from "../dtos/request/register-order-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterOrderResponseDto } from "../dtos/response/register-order-response.dto";
import { RegisterOrderCommand } from "../../messages/commands/register-order-command";
import { RegisterOrderValidator } from "../validators/register-order.validator";
import { CommandBus } from "@nestjs/cqrs";
import { EntitySchema, getRepository, Repository } from "typeorm";
import { OrderTypeORM } from "../../infrastructure/persistence/typeorm/entities/orderTypeORM";
import { InjectRepository } from "@nestjs/typeorm";
import { EdithOrderRequestDto } from "../dtos/request/edith-order-request.dto";
import { Order } from "../../domain/entities/order";
import { RegisterOrderHandler } from "../handlers/commands/register-order.handler";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

@Injectable()
export class OrderApplicationServices {

  constructor(
    private registerOrderValidator:RegisterOrderValidator,
    @InjectRepository(OrderTypeORM)
    private readonly orderRepository:Repository<OrderTypeORM>
  ) {}

  async GetAll(){
    return await this.orderRepository.find();
  }

  async GetById(id: number){

   const order= await this.orderRepository.findOne(id);
   if(!order) throw new NotFoundException('Order does not exist');
   return order;
  }

  async Create(registerOrderRequestDto:RegisterOrderRequestDto)
    :Promise<Result<AppNotification, RegisterOrderResponseDto>>{

    const notification:AppNotification=await this.registerOrderValidator.validate(registerOrderRequestDto);

    if (notification.hasErrors()){
      return Result.error(notification);
    }
    const insertResult= await this.orderRepository.insert(registerOrderRequestDto as any);

    const orderId:number=Number(insertResult.identifiers[0].id);

    const registerOrderResponseDto:RegisterOrderResponseDto= new RegisterOrderResponseDto(
      orderId,
      registerOrderRequestDto.price,
      registerOrderRequestDto.purchaseDate,
      registerOrderRequestDto.status
    );
    return Result.ok(registerOrderResponseDto);
  }

  async Update(id: number,edithOrderRequestDto:EdithOrderRequestDto){
    const order= await this.orderRepository.findOne(id);
    if(!order) throw new NotFoundException('Post does not exist');
    const editedOrder=Object.assign(order,edithOrderRequestDto);
    return this.orderRepository.save(editedOrder);
  }

  async Delete(id: number){
    const order= await this.orderRepository.findOne(id);
    if(!order) throw new NotFoundException('Post does not exist');
    return this.orderRepository.delete(id);
  }
}
