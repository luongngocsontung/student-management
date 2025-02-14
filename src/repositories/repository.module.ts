import { Global, Module } from '@nestjs/common';
import { StudentRepo } from './student.repo';
import { TeacherRepo } from './teacher.repo';
import { TeacherOnStudentRepo } from './teacher-on-student.repo';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [StudentRepo, TeacherRepo, TeacherOnStudentRepo],
  exports: [StudentRepo, TeacherRepo, TeacherOnStudentRepo],
})
export class RepositoryModule {}
