import {
  IsString,
  IsNumber,
  IsISO8601,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(13)
  isbn: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsISO8601()
  publishedDate: string;

  @IsNumber()
  author: { id: number };

  @IsNumber()
  category: { id: number };
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(13)
  isbn?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsISO8601()
  publishedDate?: string;

  @IsOptional()
  @IsNumber()
  author?: { id: number };

  @IsOptional()
  @IsNumber()
  category?: { id: number };
}
