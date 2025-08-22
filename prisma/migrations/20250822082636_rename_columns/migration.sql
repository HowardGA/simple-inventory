/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `itemImage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemStock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "quantity",
ADD COLUMN     "itemDescription" TEXT,
ADD COLUMN     "itemImage" TEXT NOT NULL,
ADD COLUMN     "itemName" TEXT NOT NULL,
ADD COLUMN     "itemPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "itemStock" INTEGER NOT NULL;
