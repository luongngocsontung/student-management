import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
