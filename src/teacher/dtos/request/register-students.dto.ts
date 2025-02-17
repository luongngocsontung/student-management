import {
  IsEmail,
  ArrayNotEmpty,
  ArrayUnique,
  IsNotEmpty,
} from 'class-validator';

export class RegisterStudentRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  teacher: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEmail({}, { each: true })
  students: string[];
}
