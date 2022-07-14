/*
  Warnings:

  - You are about to drop the column `hash` on the `Children` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_uid]` on the table `Children` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_uid` to the `Children` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Children_hash_key";

-- AlterTable
ALTER TABLE "Children" DROP COLUMN "hash",
ADD COLUMN     "user_uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Children_user_uid_key" ON "Children"("user_uid");
