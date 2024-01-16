import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // @PrimaryGeneratedColumn() // 자동으로 +1 아이디 생성
  // @PrimaryColumn() // 직접 생성할 primary key
  @PrimaryGeneratedColumn('uuid') // uuid 자동 생성
  id: string;

  @Column()
  title: string;

  // 데이터가 생성되는 날짜시간으로 자동 지정
  @CreateDateColumn()
  createdAt: Date;

  // 데이터가 업데이트 될때마다 날짜 시간 자동 지정
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될 떄마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 불리는 횟수이다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;
}
