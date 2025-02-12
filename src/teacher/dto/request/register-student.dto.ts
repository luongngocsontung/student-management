import { IsEmail, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class RegisterStudentRequestDTO {
  @IsEmail()
  teacher: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEmail({}, { each: true })
  students: string[];
}
