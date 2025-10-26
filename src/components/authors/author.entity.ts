import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
