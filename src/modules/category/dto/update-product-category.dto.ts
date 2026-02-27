import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-product-category.dto';

export class UpdateCategoryDto extends PartialType(
    CreateCategoryDto,
) { }
