/*
  Warnings:

  - You are about to drop the column `name` on the `Children` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Children` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Children"
RENAME COLUMN "name" TO "firstName";
