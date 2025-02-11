import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  email: string;
}
