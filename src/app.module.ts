import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { myDatabaseInfo } from '../my_settings';
import { UserModel } from './entity/user.entity';
import { StudentModel, TeacherModel } from "./entity/person.entity";
import { AirplaneModel, BookModel, CarModel, ComputerModel, SingleBaseModel } from "./entity/inheritance.entity";
import { ProfileModel } from "./entity/profile.entity";
import { PostModel } from "./entity/post.entity";
import { TagModel } from "./entity/tag.entity";

@Module({
  imports: [
    // CRUD 를 위한 것
    TypeOrmModule.forFeature([
      UserModel,
      ProfileModel,
      PostModel,
      TagModel,
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
        PostModel,
        TagModel,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
