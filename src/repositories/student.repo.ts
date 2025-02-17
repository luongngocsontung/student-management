import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentRepo {
  constructor(private prisma: PrismaService) {}

  getStudentsByEmails(emails: string[]) {
    return this.prisma.student.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });
  }

  getActiveStudentsByEmails(emails: string[]) {
    return this.prisma.student.findMany({
      where: {
        email: {
          in: emails,
        },
        is_suspended: false,
      },
    });
  }

  suspendStudentByEmail(email: string) {
    return this.prisma.student.update({
      where: {
        email,
      },
      data: {
        is_suspended: true,
      },
    });
  }
}
