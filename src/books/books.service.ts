import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  findAll() {
    return this.bookRepo.find();
  }

  findOne(id: number) {
    return this.bookRepo.findOneBy({ id });
  }

  create(data: Partial<Book>) {
    const book = this.bookRepo.create(data);
    return this.bookRepo.save(book);
  }

  update(id: number, data: Partial<Book>) {
    return this.bookRepo.update(id, data);
  }

  remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
