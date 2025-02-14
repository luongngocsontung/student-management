import { Transform } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsEmail } from 'class-validator';

export class CommonStudentsRequestDTO {
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEmail({}, { each: true })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : [value];
  })
  teacher: string[];
}
