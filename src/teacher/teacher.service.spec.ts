import { Test } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { StudentRepo } from 'src/repositories/student.repo';
import {
  mockStudentRepo,
  mockTeacherOnStudentRepo,
  mockTeacherRepo,
} from 'src/__mocks__';
import { TeacherRepo } from 'src/repositories/teacher.repo';
import { TeacherOnStudentRepo } from 'src/repositories/teacher-on-student.repo';
import { RegisterStudentRequestDTO } from './dtos';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RetrieveNotificationRequestDTO } from './dtos/request/retrieve-notification.dto';
import { extractEmailsFromText } from 'src/utils';
import { Messages } from 'src/constants';

jest.mock('src/utils/common', () => ({
  extractEmailsFromText: jest.fn(),
}));

describe('TeacherService', () => {
  let service: TeacherService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TeacherService,
        { provide: StudentRepo, useValue: mockStudentRepo },
        { provide: TeacherRepo, useValue: mockTeacherRepo },
        { provide: TeacherOnStudentRepo, useValue: mockTeacherOnStudentRepo },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('shoud be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerStudents', () => {
    let dto: RegisterStudentRequestDTO;

    beforeEach(() => {
      dto = {
        teacher: 'teacher@example.com',
        students: ['student1@example.com', 'student2@example.com'],
      };
    });

    it('should throw an exception if the teacher is not found', async () => {
      mockTeacherRepo.getTeacherByEmail.mockResolvedValue(null);

      await expect(service.registerStudents(dto)).rejects.toThrow(
        new HttpException(Messages.TEACHER_NOT_FOUND, HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an exception if one or more students are not found', async () => {
      mockTeacherRepo.getTeacherByEmail.mockResolvedValue({ id: 1 });
      mockStudentRepo.getStudentsByEmails.mockResolvedValue([]);

      await expect(service.registerStudents(dto)).rejects.toThrow(
        new HttpException(
          Messages.ONE_OR_MORE_STUDENTS_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should register students successfully', async () => {
      mockTeacherRepo.getTeacherByEmail.mockResolvedValue({ id: 1 });
      mockStudentRepo.getStudentsByEmails.mockResolvedValue([
        { id: 101, email: 'student1@example.com' },
        { id: 102, email: 'student2@example.com' },
      ]);
      mockTeacherOnStudentRepo.createTeacherOnStudents.mockResolvedValue({
        count: 2,
      });

      const result = await service.registerStudents(dto);
      expect(result).toStrictEqual({
        count: 2,
      });
      expect(
        mockTeacherOnStudentRepo.createTeacherOnStudents,
      ).toHaveBeenCalledWith(1, [101, 102]);
    });
  });

  describe('getCommonStudents', () => {
    let teacherEmails: string[];

    beforeEach(() => {
      teacherEmails = ['teacher1@example.com', 'teacher2@example.com'];
    });

    it('should return common students emails', async () => {
      const mockStudents = [
        { id: 1, email: 'student1@example.com' },
        { id: 2, email: 'student2@example.com' },
      ];

      mockTeacherRepo.getCommonStudentsByTeacherEmails.mockResolvedValue(
        mockStudents,
      );

      const result = await service.getCommonStudents(teacherEmails);

      expect(
        mockTeacherRepo.getCommonStudentsByTeacherEmails,
      ).toHaveBeenCalledWith(teacherEmails);
      expect(result).toEqual(['student1@example.com', 'student2@example.com']);
    });

    it('should return an empty array if no common students are found', async () => {
      mockTeacherRepo.getCommonStudentsByTeacherEmails.mockResolvedValue([]);

      const result = await service.getCommonStudents(teacherEmails);

      expect(
        mockTeacherRepo.getCommonStudentsByTeacherEmails,
      ).toHaveBeenCalledWith(teacherEmails);
      expect(result).toEqual([]);
    });
  });

  describe('suspendStudent', () => {
    const studentEmail = 'student@example.com';

    it('should suspend a student successfully', async () => {
      const mockStudent = { id: 1, email: studentEmail, suspended: true };

      mockStudentRepo.suspendStudentByEmail.mockResolvedValue(mockStudent);

      const result = await service.suspendStudent(studentEmail);

      expect(mockStudentRepo.suspendStudentByEmail).toHaveBeenCalledWith(
        studentEmail,
      );
      expect(result).toEqual(mockStudent);
    });

    it('should throw HttpException if student is not found', async () => {
      const error = new Error('Record not found');
      (error as any).code = 'P2025';

      mockStudentRepo.suspendStudentByEmail.mockRejectedValue(error);

      await expect(service.suspendStudent(studentEmail)).rejects.toThrow(
        new HttpException(Messages.STUDENT_NOT_FOUND, HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('retrieveForNotifications', () => {
    it('should retrieve students successfully', async () => {
      const dto: RetrieveNotificationRequestDTO = {
        teacher: 'teacher@example.com',
        notification: 'Hello student1@example.com and student2@example.com',
      };

      const mockTeacher = { id: 1, email: dto.teacher };
      const mockRegistedStudents = [{ email: 'student1@example.com' }];
      const mockExtractedEmails = ['student2@example.com'];
      const mockExistedStudents = [{ email: 'student2@example.com' }];

      mockTeacherRepo.getTeacherByEmail.mockResolvedValue(mockTeacher);
      mockTeacherRepo.getRegistedStudentsByTeacherId.mockResolvedValue(
        mockRegistedStudents,
      );
      (extractEmailsFromText as jest.Mock).mockReturnValue(mockExtractedEmails);
      mockStudentRepo.getActiveStudentsByEmails.mockResolvedValue(
        mockExistedStudents,
      );

      const result = await service.retrieveForNotifications(dto);

      expect(mockTeacherRepo.getTeacherByEmail).toHaveBeenCalledWith(
        dto.teacher,
      );
      expect(
        mockTeacherRepo.getRegistedStudentsByTeacherId,
      ).toHaveBeenCalledWith(mockTeacher.id);
      expect(extractEmailsFromText).toHaveBeenCalledWith(dto.notification);
      expect(mockStudentRepo.getActiveStudentsByEmails).toHaveBeenCalledWith(
        mockExtractedEmails,
      );
      expect(result).toEqual({
        recipients: ['student1@example.com', 'student2@example.com'],
      });
    });

    it('should throw HttpException if the teacher is not found', async () => {
      const dto: RetrieveNotificationRequestDTO = {
        teacher: 'unknown@example.com',
        notification: 'Test notification',
      };

      mockTeacherRepo.getTeacherByEmail.mockResolvedValue(null);

      await expect(service.retrieveForNotifications(dto)).rejects.toThrow(
        new HttpException(Messages.TEACHER_NOT_FOUND, HttpStatus.NOT_FOUND),
      );
    });
  });
});
