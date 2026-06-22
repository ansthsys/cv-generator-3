/*
  Warnings:

  - You are about to drop the column `slug` on the `cvs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "cvs_slug_key";

-- AlterTable
ALTER TABLE "cvs" DROP COLUMN "slug";
