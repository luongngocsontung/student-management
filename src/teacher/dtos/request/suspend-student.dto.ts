import { IsEmail, IsNotEmpty } from 'class-validator';

export class SuspendStudentRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  student: string;
}
