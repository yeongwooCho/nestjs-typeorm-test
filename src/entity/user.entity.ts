import {
  Column,
  CreateDateColumn,
  Entity,
  Generated, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";
import { ProfileModel } from "./profile.entity";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class UserModel {
  @OneToOne(
    ()=> ProfileModel,
    (profile) => profile.user
  )
  profile: ProfileModel;

  // @PrimaryGeneratedColumn() // 자동으로 +1 아이디 생성
  // @PrimaryColumn() // 직접 생성할 primary key
  @PrimaryGeneratedColumn("uuid") // uuid 자동 생성
  id: string;

  @Column({
    // DB에서 인지하는 칼럼 타입(자동 완성)
    // default: property type
    type: "varchar",
    // DB 칼럼 이름
    // default: property name
    name: "_title",
    // 값의 길이: 입력 가능한 글자 길이
    length: 300,
    // null 가능?
    nullable: true,
    // 업데이트 가능 여부
    update: true,
    // find() 를 실핼할때 기본으로 값을 불러올지?
    select: true, // default: true
    // 아무것도 입력이 안 됐을때 기본 값
    default: "왜들그리다운돼있어~",
    // 칼럼 중 유일무이한 값이 되어야 하는가
    unique: false
  })
  title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

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
  @Generated("uuid")
  additionalId: string;
}
