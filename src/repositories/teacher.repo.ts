import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherRepo {
  constructor(private prisma: PrismaService) {}

  getTeacherByEmail(email: string) {
    return this.prisma.teacher.findUnique({
      where: {
        email,
      },
    });
  }

  async getCommonStudentsByTeacherEmails(
    emails: string[],
  ): Promise<{ email: string }[]> {
    const commonStudents: { email: string }[] = await this.prisma.$queryRaw`
      WITH temp AS (
        SELECT tos.student_id
        FROM teachers t
        INNER JOIN teachers_on_students tos ON t.id = tos.teacher_id
        WHERE t.email IN (${Prisma.join(emails)})
        GROUP BY tos.student_id
        HAVING count(tos.student_id) = ${emails.length}
      )
      SELECT students.email
      FROM temp
      INNER JOIN students ON temp.student_id = students.id;
    `;
    return commonStudents;
  }

  async getRegistedStudentsByTeacherId(
    teacherId: number,
  ): Promise<{ email: string }[]> {
    const registedStudents: { email: string }[] = await this.prisma.$queryRaw`
      SELECT s.email FROM teachers_on_students tos
      INNER JOIN students s ON s.id = tos.student_id AND s.is_suspended = false
      WHERE tos.teacher_id = ${teacherId}
    `;
    return registedStudents;
  }
}
