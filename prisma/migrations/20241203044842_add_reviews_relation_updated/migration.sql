/*
  Warnings:

  - You are about to alter the column `created_at` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Plumber` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Plumber` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `fk_client_reviewed`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `fk_client_reviewer`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `fk_plumber_reviewed`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `fk_plumber_reviewer`;

-- AlterTable
ALTER TABLE `Client` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Plumber` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MODIFY `updated_at` TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE `Review`;

-- CreateTable
CREATE TABLE `ClientReview` (
    `id` CHAR(36) NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 1,
    `reviewText` VARCHAR(191) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL,
    `reviewerId` CHAR(36) NOT NULL,
    `revieweeId` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlumberReview` (
    `id` CHAR(36) NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 1,
    `reviewText` VARCHAR(191) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL,
    `reviewerId` CHAR(36) NOT NULL,
    `revieweeId` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientReview` ADD CONSTRAINT `fk_plumber_reviewer` FOREIGN KEY (`reviewerId`) REFERENCES `Plumber`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientReview` ADD CONSTRAINT `fk_client_reviewee` FOREIGN KEY (`revieweeId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlumberReview` ADD CONSTRAINT `fk_client_reviewer` FOREIGN KEY (`reviewerId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlumberReview` ADD CONSTRAINT `fk_plumber_reviewee` FOREIGN KEY (`revieweeId`) REFERENCES `Plumber`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
