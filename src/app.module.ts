import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { myDatabaseInfo } from '../my_settings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: myDatabaseInfo.host,
      port: myDatabaseInfo.port,
      username: myDatabaseInfo.username,
      password: myDatabaseInfo.password,
      database: myDatabaseInfo.database,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
