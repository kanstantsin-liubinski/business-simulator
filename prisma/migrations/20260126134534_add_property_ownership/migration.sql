-- AlterTable
ALTER TABLE "cities_estate_objects" ADD COLUMN     "owner_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 100000;

-- AddForeignKey
ALTER TABLE "cities_estate_objects" ADD CONSTRAINT "cities_estate_objects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
