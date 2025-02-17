import { IsEmail, IsNotEmpty } from 'class-validator';

export class RetrieveNotificationRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  teacher: string;

  @IsNotEmpty()
  notification: string;
}
