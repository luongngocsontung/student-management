/*
  Warnings:

  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Students`;

-- DropTable
DROP TABLE `Teachers`;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `teachers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `students_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StudentToTeacher` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StudentToTeacher_AB_unique`(`A`, `B`),
    INDEX `_StudentToTeacher_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_StudentToTeacher` ADD CONSTRAINT `_StudentToTeacher_A_fkey` FOREIGN KEY (`A`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToTeacher` ADD CONSTRAINT `_StudentToTeacher_B_fkey` FOREIGN KEY (`B`) REFERENCES `teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
