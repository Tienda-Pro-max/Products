/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `rating` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,1)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "brand" TEXT,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "product_category_id_idx" ON "product"("category_id");

-- CreateIndex
CREATE INDEX "product_image_product_id_idx" ON "product_image"("product_id");
