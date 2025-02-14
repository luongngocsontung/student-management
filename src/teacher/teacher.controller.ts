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
  async getCommonStudents(@Query() query: CommonStudentsRequestDTO) {
    return this.teacherService.getCommonStudents(query.teacher);
  }
}
