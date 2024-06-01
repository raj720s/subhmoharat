/*
  Warnings:

  - You are about to drop the column `locality` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Address` DROP COLUMN `locality`,
    MODIFY `street` VARCHAR(191) NULL;
