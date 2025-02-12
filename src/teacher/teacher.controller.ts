import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterStudentRequestDTO } from './dto';
import { TeacherService } from './teacher.service';

@Controller('api')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerStudent(@Body() dto: RegisterStudentRequestDTO) {
    await this.teacherService.registerStudent(dto);
  }
}
