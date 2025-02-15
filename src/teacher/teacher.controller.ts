import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { RegisterStudentRequestDTO } from './dtos';
import { TeacherService } from './teacher.service';
import { CommonStudentsRequestDTO } from './dtos/request/common-students.dto';
import { SuspendStudentRequestDTO } from './dtos/request/suspend-student.dto';

@Controller('api')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudent(@Body() dto: RegisterStudentRequestDTO) {
    await this.teacherService.registerStudent(dto);
  }

  @Get('commonstudents')
  @HttpCode(HttpStatus.OK)
  getCommonStudents(@Query() query: CommonStudentsRequestDTO) {
    return this.teacherService.getCommonStudents(query.teacher);
  }

  @Post('suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspendStudent(@Body() dto: SuspendStudentRequestDTO) {
    await this.teacherService.suspendStudent(dto.student);
  }
}
