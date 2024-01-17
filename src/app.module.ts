import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { myDatabaseInfo } from '../my_settings';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from "./entity/person.entity";
import { AirplaneModel, BookModel, CarModel, ComputerModel, SingleBaseModel } from "./entity/inheritance.entity";
import { ProfileModel } from "./entity/profile.entity";

@Module({
  imports: [
    // CRUD 를 위한 것
    TypeOrmModule.forFeature([
      UserModel,
      ProfileModel,
    ]),
    // 테이블 생성을 위한 것
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: myDatabaseInfo.host,
      port: myDatabaseInfo.port,
      username: myDatabaseInfo.username,
      password: myDatabaseInfo.password,
      database: myDatabaseInfo.database,
      entities: [
        UserModel,
        StudentModel,
        TeacherModel,
        BookModel,
        CarModel,
        SingleBaseModel,
        ComputerModel,
        AirplaneModel,
        ProfileModel,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
