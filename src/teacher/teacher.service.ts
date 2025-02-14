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
    const { teacher: teacherEmail, students: studentEmails } = data;
    const teacher = await this.teacherRepo.getTeacherByEmail(teacherEmail);

    if (!teacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }

    const students = await this.studentRepo.getStudentsByEmails(studentEmails);

    if (students.length !== studentEmails.length) {
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

  async getCommonStudents(teacherEmails: string[]) {
    try {
      const commonStudents =
        await this.teacherRepo.getCommonStudentsByTeacherEmails(teacherEmails);

      return commonStudents.map((student) => student.email);
    } catch (error) {
      throw error;
    }
  }
}
