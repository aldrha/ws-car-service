-- AlterTable
ALTER TABLE `user` ADD COLUMN `otpCode` VARCHAR(191) NULL,
    ADD COLUMN `otpExpires` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `vehicle` MODIFY `initialMileage` INTEGER NOT NULL DEFAULT 0;
