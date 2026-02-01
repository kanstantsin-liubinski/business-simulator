-- CreateTable
CREATE TABLE "car_makes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_makes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "make_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "new_cars" (
    "id" TEXT NOT NULL,
    "make_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "condition" INTEGER NOT NULL DEFAULT 100,
    "color" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "new_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "used_cars" (
    "id" TEXT NOT NULL,
    "make_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "condition" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "used_cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_makes_name_key" ON "car_makes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "car_models_make_id_name_key" ON "car_models"("make_id", "name");

-- AddForeignKey
ALTER TABLE "car_models" ADD CONSTRAINT "car_models_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "car_makes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "new_cars" ADD CONSTRAINT "new_cars_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "car_makes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "new_cars" ADD CONSTRAINT "new_cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "used_cars" ADD CONSTRAINT "used_cars_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "car_makes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "used_cars" ADD CONSTRAINT "used_cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "car_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;
