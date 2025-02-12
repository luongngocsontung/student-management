import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterStudentRequestDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}
  async registerStudent(dto: RegisterStudentRequestDTO) {
    try {
      const teacher = await this.prisma.teacher.update({
        where: { email: dto.teacher },
        data: {
          students: {
            connect: [...dto.students.map((student) => ({ email: student }))],
          },
        },
      });
      return teacher;
    } catch (error) {
      if (error.code === 'P2016') {
        throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
      }
      if (error.code === 'P2025') {
        throw new HttpException(
          '1 or more students not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw error;
    }
  }
}
