import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './products.service';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // POST /products
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // // GET /products
  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  //Get by category / get all
  @Get()
  async getProducts(
    @Query('current') current = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.productService.findAll(
      Number(current),
      Number(pageSize),
    );
  }
  // PATCH /products/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(+id, dto);
  }

  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
