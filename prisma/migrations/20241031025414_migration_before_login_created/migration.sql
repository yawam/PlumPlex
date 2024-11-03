/*
  Warnings:

  - Added the required column `image` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Plumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Plumber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Plumber` ADD COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `isClient` BOOLEAN NOT NULL DEFAULT false,
    `isPlumber` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
