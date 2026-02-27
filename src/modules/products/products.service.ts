import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) { }

  // CREATE
  async create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async findAll(current: number, pageSize: number) {

    const [data, total] = await this.productRepo.findAndCount({
      relations: ['category'], // 👈 JOIN
      skip: (current - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      results: data,
      meta: {
        current,
        pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
    };
  }

  // READ ONE
  async findOne(productId: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }


  // UPDATE
  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    Object.assign(product, dto);

    return this.productRepo.save(product);
  }

  // DELETE
  async remove(id: number) {
    const product = await this.findOne(id);

    return this.productRepo.remove(product);
  }



}
