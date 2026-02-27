import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/product-category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [ProductCategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
