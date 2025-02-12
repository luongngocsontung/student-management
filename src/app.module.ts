import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TeacherModule } from './teacher/teacher.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [config],
    }),
    TeacherModule,
  ],
})
export class AppModule {}
