import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherOnStudentRepo {
  constructor(private prisma: PrismaService) {}

  createTeacherOnStudents(teacherId: number, studentIds: number[]) {
    return this.prisma.teacherOnStudent.createMany({
      data: studentIds.map((studentId) => ({
        teacher_id: teacherId,
        student_id: studentId,
      })),
      skipDuplicates: true,
    });
  }
}
