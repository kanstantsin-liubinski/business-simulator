-- CreateTable
CREATE TABLE "user_cars" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cars_user_id_car_id_key" ON "user_cars"("user_id", "car_id");

-- AddForeignKey
ALTER TABLE "user_cars" ADD CONSTRAINT "user_cars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cars" ADD CONSTRAINT "user_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "used_cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
