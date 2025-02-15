import { IsEmail } from 'class-validator';

export class SuspendStudentRequestDTO {
  @IsEmail()
  student: string;
}
