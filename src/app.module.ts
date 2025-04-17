import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductsModule, CloudinaryModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
