import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModelRepository: Repository<UserModel>,
  ) {}

  @Post('users')
  async postUsers() {
    return this.userModelRepository.save({
      title: 'title',
    });
  }

  @Get('users')
  async getUsers() {
    return await this.userModelRepository.find();
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
      title: user.title + '0',
    })
  }
}
