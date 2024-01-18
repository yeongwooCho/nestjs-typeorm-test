import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from "./entity/profile.entity";
import { PostModel } from "./entity/post.entity";
import { TagModel } from "./entity/tag.entity";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
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
        // profile: true,
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
      profile: {
        profileImg: 'asdf.jpg'
      }
    })

    // await this.profileRepository.save({
    //   user,
    //   profileImg: 'asdf.jpg'
    // })

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

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture'
    })

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture'
    })

    const tag1 = await this.tagRepository.save({
      name: 'JavaScript',
      posts: [post1, post2],
    })

    const tag2 = await this.tagRepository.save({
      name: 'TypeScript',
      posts: [post1],
    })

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2]
    })

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true
      }
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true
      }
    });
  }
}
