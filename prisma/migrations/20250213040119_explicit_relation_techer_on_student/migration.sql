/*
  Warnings:

  - You are about to drop the `_StudentToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_StudentToTeacher` DROP FOREIGN KEY `_StudentToTeacher_A_fkey`;

-- DropForeignKey
ALTER TABLE `_StudentToTeacher` DROP FOREIGN KEY `_StudentToTeacher_B_fkey`;

-- DropTable
DROP TABLE `_StudentToTeacher`;

-- CreateTable
CREATE TABLE `teachers_on_students` (
    `teacher_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,

    PRIMARY KEY (`teacher_id`, `student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teachers_on_students` ADD CONSTRAINT `teachers_on_students_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachers_on_students` ADD CONSTRAINT `teachers_on_students_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
