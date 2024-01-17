import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from "./entity/profile.entity";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModelRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileModelRepository: Repository<ProfileModel>,
  ) {}

  @Post('users')
  async postUsers() {
    return this.userModelRepository.save({
      // title: 'title',
    });
  }

  @Get('users')
  async getUsers() {
    return await this.userModelRepository.find({
      relations: {
        profile: true,
      }
    });
  }

  @Patch('users/:id')
  async patchUsers(@Param('id') id: string) {
    const user = await this.userModelRepository.findOne({
      where: {
        id: id,
      },
    })
    return await this.userModelRepository.save({
      ...user,
      // title: user.title + '0',
    })
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userModelRepository.save({
      email: 'asdf@codefactory.ai',
    })

    const profile = await this.profileModelRepository.save({
      user,
      profileImg: 'asdf.jpg'
    })

    return user;
  }
}
