import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from "./entity/profile.entity";
import { PostModel } from "./entity/post.entity";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) {}

  @Post('users')
  async postUsers() {
    return this.userRepository.save({
      // title: 'title',
    });
  }

  @Get('users')
  async getUsers() {
    return await this.userRepository.find({
      relations: {
        profile: true,
        posts: true,
      }
    });
  }

  @Patch('users/:id')
  async patchUsers(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    })
    return await this.userRepository.save({
      ...user,
      // title: user.title + '0',
    })
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
    })

    await this.profileRepository.save({
      user,
      profileImg: 'asdf.jpg'
    })

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'protuser@codefactory.ai',
    })

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    })
    await this.postRepository.save({
      author: user,
      title: 'post 2',
    })

    return user;
  }
}
