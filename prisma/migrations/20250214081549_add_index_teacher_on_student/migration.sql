-- CreateIndex
CREATE INDEX `teachers_on_students_teacher_id_idx` ON `teachers_on_students`(`teacher_id`);

-- RenameIndex
ALTER TABLE `teachers_on_students` RENAME INDEX `teachers_on_students_student_id_fkey` TO `teachers_on_students_student_id_idx`;
