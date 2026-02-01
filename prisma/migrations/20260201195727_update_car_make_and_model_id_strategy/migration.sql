/*
  Warnings:

  - You are about to drop the column `createdAt` on the `car_makes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `car_models` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "car_makes" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "car_models" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
