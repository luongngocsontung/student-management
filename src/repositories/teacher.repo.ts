import { Injectable } from '@nestjs/common';
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
}
