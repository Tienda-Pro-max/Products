import { Controller, Post, Body, UploadedFile, UseInterceptors, BadRequestException, Delete, Param, Get, Query, ParseIntPipe, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  findAll(@Query('category_id') category_id?: string) {
    return this.productsService.findAll(category_id ? parseInt(category_id) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new BadRequestException('Image file is required');
      }

      const cloudinaryResponse = await this.cloudinaryService.uploadImage(file);

      // Asegurarse de que los datos sean del tipo correcto
      const processedDto = {
        name: String(createProductDto.name),
        description: String(createProductDto.description),
        price: Number(createProductDto.price),
        stock: Number(createProductDto.stock),
        category_id: Number(createProductDto.category_id),
        is_active: Boolean(createProductDto.is_active),
        images: [
          {
            image_url: cloudinaryResponse.secure_url,
            is_main: true,
          },
        ],
      };

      return await this.productsService.create(processedDto);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await this.productsService.remove(id);
      
      for (const image of product.images) {
        const publicId = image.image_url.split('/').pop().split('.')[0];
        await this.cloudinaryService.deleteImage(publicId);
      }

      return {
        message: 'Product and its images deleted successfully',
        deletedProduct: product
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}
