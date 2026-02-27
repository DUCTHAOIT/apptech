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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-product-category.dto';
import { UpdateCategoryDto } from './dto/update-product-category.dto';


@Controller('category')
export class ProductCategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  // POST /product-categories
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  async findAll(
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.categoryService.findAll(+current, +pageSize);
    // return this.usersService.findAll(query, +current, +pageSize);
  }

  // GET /product-categories/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // PATCH /product-categories/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, dto);
  }

  // DELETE /product-categories/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
