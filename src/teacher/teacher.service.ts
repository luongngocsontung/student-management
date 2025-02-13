import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterStudentRequestDTO } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async registerStudent(data: RegisterStudentRequestDTO) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { email: data.teacher },
      select: { id: true },
    });

    if (!teacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }

    const students = await this.prisma.student.findMany({
      where: {
        email: {
          in: data.students,
        },
      },
    });

    if (students.length !== data.students.length) {
      throw new HttpException(
        '1 or more students not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const teacherOnStudents = await this.prisma.teacherOnStudent.createMany({
      data: students.map((student) => ({
        teacher_id: teacher.id,
        student_id: student.id,
      })),
      skipDuplicates: true,
    });

    return teacherOnStudents;
  }

  async getCommonStudents(teacher: string[]) {
    try {
      // const teacherIds = await this.prisma.teacher.findMany({
      //   where: { email: { in: teacher } },
      //   select: { id: true },
      // });
      // const commonStudents = await this.prisma.
      // return { students: commonStudents };
    } catch (error) {
      throw error;
    }
  }
}
