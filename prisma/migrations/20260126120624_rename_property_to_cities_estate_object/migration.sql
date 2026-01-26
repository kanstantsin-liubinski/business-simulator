/*
  Warnings:

  - You are about to drop the `properties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_city_id_fkey";

-- DropTable
DROP TABLE "properties";

-- CreateTable
CREATE TABLE "cities_estate_objects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_estate_objects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cities_estate_objects" ADD CONSTRAINT "cities_estate_objects_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
