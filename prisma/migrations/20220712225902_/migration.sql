/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Children` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Children" ADD COLUMN     "hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Children_hash_key" ON "Children"("hash");
