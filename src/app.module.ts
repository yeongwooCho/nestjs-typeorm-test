import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { myDatabaseInfo } from '../my_settings';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from "./entity/person.entity";

@Module({
  imports: [
    // CRUD 를 위한 것
    TypeOrmModule.forFeature([UserModel]),
    // 테이블 생성을 위한 것
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: myDatabaseInfo.host,
      port: myDatabaseInfo.port,
      username: myDatabaseInfo.username,
      password: myDatabaseInfo.password,
      database: myDatabaseInfo.database,
      entities: [UserModel, StudentModel, TeacherModel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
