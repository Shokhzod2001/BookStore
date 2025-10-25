import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Book])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
