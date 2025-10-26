import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [BooksModule, AuthorsModule, CategoriesModule],
})
export class ComponentsModule {}
