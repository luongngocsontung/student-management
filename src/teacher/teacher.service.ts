import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterStudentRequestDTO } from './dtos';
import { StudentRepo } from 'src/repositories/student.repo';
import { TeacherRepo } from 'src/repositories/teacher.repo';
import { TeacherOnStudentRepo } from 'src/repositories/teacher-on-student.repo';
import { RetrieveNotificationRequestDTO } from './dtos/request/retrieve-notification.dto';
import { extractEmailsFromText } from 'src/utils';
import { Messages } from 'src/constants';

@Injectable()
export class TeacherService {
  constructor(
    private studentRepo: StudentRepo,
    private teacherRepo: TeacherRepo,
    private teacherOnStudentRepo: TeacherOnStudentRepo,
  ) {}

  async registerStudents(data: RegisterStudentRequestDTO) {
    const { teacher: teacherEmail, students: studentEmails } = data;
    const teacher = await this.teacherRepo.getTeacherByEmail(teacherEmail);

    if (!teacher) {
      throw new HttpException(Messages.TEACHER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const students = await this.studentRepo.getStudentsByEmails(studentEmails);

    if (students.length !== studentEmails.length) {
      throw new HttpException(
        Messages.ONE_OR_MORE_STUDENTS_NOT_FOUND,
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
    const commonStudents =
      await this.teacherRepo.getCommonStudentsByTeacherEmails(teacherEmails);

    return commonStudents.map((student) => student.email);
  }

  async suspendStudent(studentEmail: string) {
    try {
      const student =
        await this.studentRepo.suspendStudentByEmail(studentEmail);
      return student;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          Messages.STUDENT_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      throw error;
    }
  }

  async retrieveForNotifications(dto: RetrieveNotificationRequestDTO) {
    const teacher = await this.teacherRepo.getTeacherByEmail(dto.teacher);
    if (!teacher) {
      throw new HttpException(Messages.TEACHER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const studentEmails = new Set();

    // Get registed students from teacher
    const registedStudents =
      await this.teacherRepo.getRegistedStudentsByTeacherId(teacher.id);
    registedStudents.map((student) => studentEmails.add(student.email));

    // Extract student emails from notification
    const studentEmailsFromNotification = extractEmailsFromText(
      dto.notification,
    );

    // Get existed students from notification
    const existedStudents = await this.studentRepo.getActiveStudentsByEmails(
      studentEmailsFromNotification,
    );
    existedStudents.map((student) => studentEmails.add(student.email));

    return {
      recipients: Array.from(studentEmails),
    };
  }
}
