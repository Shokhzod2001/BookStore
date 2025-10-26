import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // CREATE - Add a new book
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return await this.booksRepository.save(book);
  }

  // READ - Get all books
  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find({
      relations: ['author', 'category'],
    });
  }

  // READ - Get one book by ID
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  // READ - Search books by title
  async searchByTitle(title: string): Promise<Book[]> {
    return await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.category', 'category')
      .where('book.title LIKE :title', { title: `%${title}%` })
      .getMany();
  }

  // READ - Get books by author
  async findByAuthor(authorId: number): Promise<Book[]> {
    return await this.booksRepository.find({
      where: { author: { id: authorId } },
      relations: ['author', 'category'],
    });
  }

  // READ - Get books by category
  async findByCategory(categoryId: number): Promise<Book[]> {
    return await this.booksRepository.find({
      where: { category: { id: categoryId } },
      relations: ['author', 'category'],
    });
  }

  // READ - Get books with low stock (inventory management)
  async findLowStock(threshold: number = 10): Promise<Book[]> {
    return await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.category', 'category')
      .where('book.stock <= :threshold', { threshold })
      .getMany();
  }

  // UPDATE - Update book details
  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, updateBookDto);
    return await this.booksRepository.save(book);
  }

  // UPDATE - Update stock (for purchases/restocking)
  async updateStock(id: number, quantity: number): Promise<Book> {
    const book = await this.findOne(id);
    book.stock += quantity;
    return await this.booksRepository.save(book);
  }

  // DELETE - Remove a book
  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.booksRepository.remove(book);
  }

  // AGGREGATE - Get statistics
  async getStatistics() {
    const stats = await this.booksRepository
      .createQueryBuilder('book')
      .select('COUNT(book.id)', 'totalBooks')
      .addSelect('SUM(book.stock)', 'totalStock')
      .addSelect('AVG(book.price)', 'averagePrice')
      .addSelect('MAX(book.price)', 'maxPrice')
      .addSelect('MIN(book.price)', 'minPrice')
      .getRawOne();

    return {
      totalBooks: parseInt(stats.totalBooks),
      totalStock: parseInt(stats.totalStock),
      averagePrice: parseFloat(parseFloat(stats.averagePrice).toFixed(2)),
      maxPrice: parseFloat(stats.maxPrice),
      minPrice: parseFloat(stats.minPrice),
    };
  }
}
