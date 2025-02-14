import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterStudentRequestDTO } from './dtos';
import { StudentRepo } from 'src/repositories/student.repo';
import { TeacherRepo } from 'src/repositories/teacher.repo';
import { TeacherOnStudentRepo } from 'src/repositories/teacher-on-student.repo';

@Injectable()
export class TeacherService {
  constructor(
    private studentRepo: StudentRepo,
    private teacherRepo: TeacherRepo,
    private teacherOnStudentRepo: TeacherOnStudentRepo,
  ) {}

  async registerStudent(data: RegisterStudentRequestDTO) {
    const teacher = await this.teacherRepo.getTeacherByEmail(data.teacher);

    if (!teacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }

    const students = await this.studentRepo.getStudentsByEmails(data.students);

    if (students.length !== data.students.length) {
      throw new HttpException(
        '1 or more students not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const teacherOnStudents =
      await this.teacherOnStudentRepo.createTeacherOnStudents(
        teacher.id,
        students.map((student) => student.id),
      );

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
