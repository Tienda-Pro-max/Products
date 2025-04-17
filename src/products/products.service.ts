import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(category_id?: number) {
    return await this.prisma.product.findMany({
      where: {
        is_active: true,
        ...(category_id && { category_id: Number(category_id) }),
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const { images, ...productData } = createProductDto;
    
    // Asegurarse de que los datos sean del tipo correcto
    const processedData = {
      name: String(productData.name),
      description: String(productData.description),
      price: Number(productData.price),
      stock: Number(productData.stock),
      category_id: Number(productData.category_id),
      is_active: Boolean(productData.is_active),
    };

    return await this.prisma.product.create({
      data: {
        ...processedData,
        images: images ? {
          create: images,
        } : undefined,
      },
      include: {
        images: true,
        category: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Verificar si el producto existe
    const existingProduct = await this.prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Actualizar el producto
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true,
        images: true
      }
    });
  }

  async remove(id: number) {
    // Primero obtener el producto con sus imágenes
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Eliminar primero las imágenes
    if (product.images.length > 0) {
      await this.prisma.product_image.deleteMany({
        where: { product_id: id },
      });
    }

    // Luego eliminar el producto
    await this.prisma.product.delete({
      where: { id },
    });

    return product;
  }
}
