/*
  Warnings:

  - Added the required column `plate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicle` ADD COLUMN `plate` VARCHAR(191) NOT NULL;
