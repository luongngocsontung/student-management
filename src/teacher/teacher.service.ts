import { Injectable } from '@nestjs/common';
import { RegisterStudentRequestDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}
  async registerStudent(dto: RegisterStudentRequestDTO) {
    // console.log(await this.prisma.teacher.findMany());
  }
}
