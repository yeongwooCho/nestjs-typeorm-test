import { UserModel } from "./user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    ()=> UserModel,
    (user)=> user.profile
  )
  user: UserModel

  @Column()
  profileImg: string;
}
