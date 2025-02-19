import { TeacherController } from './teacher.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { RegisterStudentRequestDTO } from './dtos';
import { CommonStudentsRequestDTO } from './dtos/request/common-students.dto';
import { SuspendStudentRequestDTO } from './dtos/request/suspend-student.dto';
import { RetrieveNotificationRequestDTO } from './dtos/request/retrieve-notification.dto';

describe('TeacherController', () => {
  let controller: TeacherController;

  const mockTeacherService = {
    registerStudents: jest.fn(),
    getCommonStudents: jest.fn(),
    suspendStudent: jest.fn(),
    retrieveForNotifications: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [{ provide: TeacherService, useValue: mockTeacherService }],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getCommonStudents with correct dto in TeacherService', async () => {
    const dto: CommonStudentsRequestDTO = {
      teacher: ['teacherken@gmail.com', 'teacherjoe@gmail.com'],
    };

    await controller.getCommonStudents(dto);

    expect(mockTeacherService.getCommonStudents).toHaveBeenCalledWith(
      dto.teacher,
    );
  });

  it('should call registerStudents with correct dto in TeacherService', async () => {
    const dto: RegisterStudentRequestDTO = {
      teacher: 'teacherken@gmail.com',
      students: ['studentjon@gmail.com', 'studenthon@gmail.com'],
    };

    await controller.registerStudents(dto);

    expect(mockTeacherService.registerStudents).toHaveBeenCalledWith(dto);
  });

  it('should call suspendStudent with correct dto in TeacherService', async () => {
    const dto: SuspendStudentRequestDTO = {
      student: 'studentmary@gmail.com',
    };

    await controller.suspendStudent(dto);

    expect(mockTeacherService.suspendStudent).toHaveBeenCalledWith(dto.student);
  });

  it('should call getStudentsFromNotification with correct dto in TeacherService', async () => {
    const dto: RetrieveNotificationRequestDTO = {
      teacher: 'teacherken@gmail.com',
      notification:
        'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com',
    };

    await controller.retrieveForNotifications(dto);

    expect(mockTeacherService.retrieveForNotifications).toHaveBeenCalledWith(
      dto,
    );
  });
});
