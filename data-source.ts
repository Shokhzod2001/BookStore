import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from './src/entities/book.entity';
import { User } from './src/entities/user.entity';
import { Order } from './src/entities/order.entity';
import { OrderItem } from './src/entities/order-item.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Book, User, Order, OrderItem],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
