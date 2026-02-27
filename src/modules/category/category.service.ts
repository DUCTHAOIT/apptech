import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-product-category.dto';
import { UpdateCategoryDto } from './dto/update-product-category.dto';
import { Category } from './entities/product-category.entity';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) { }

  // CREATE
  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  // READ ALL
  // async findAll(current = 1, pageSize = 10) {
  //   const [results, total] = await this.categoryRepo.findAndCount({
  //     skip: (current - 1) * pageSize,
  //     take: pageSize,
  //     select: [
  //       'categoryId',
  //       'name',
  //       'isActive',
  //       'createdAt',
  //       'updatedAt',
  //     ],
  //     order: { categoryId: 'DESC' },
  //   });

  //   return {
  //     meta: {
  //       current,
  //       pageSize,
  //       pages: Math.ceil(total / pageSize),
  //       total,
  //     },
  //     results,
  //   };
  // }
  async findAll(current?: number, pageSize?: number) {

    const isPaging = current && pageSize;

    const [results, total] = await this.categoryRepo.findAndCount({

      ...(isPaging && {
        skip: (current - 1) * pageSize,
        take: pageSize,
      }),

      select: [
        'categoryId',
        'name',
        'isActive',
        'createdAt',
        'updatedAt',
      ],

      order: { categoryId: 'DESC' },
    });

    return {
      meta: isPaging
        ? {
          current,
          pageSize,
          pages: Math.ceil(total / pageSize),
          total,
        }
        : null,

      results,
    };
  }
  // READ ONE
  async findOne(categoryId: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  // UPDATE
  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    Object.assign(category, dto);

    return this.categoryRepo.save(category);
  }

  // DELETE
  async remove(id: number) {
    const category = await this.findOne(id);

    return this.categoryRepo.remove(category);
  }
}
