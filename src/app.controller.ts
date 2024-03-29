import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike, In, IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository
} from "typeorm";
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

  @Post('sample')
  async sample() {
    // // 모델에 해당되는 객체 생성
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // })
    //
    // 모델에 해당하는 객체 생성 및 저장
    // const user2 = this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // })

    // 입력된 값을 기반으로 DB 에 있는 값을 불러오고
    // 추가 입력된 값으로 DB에서 가져온 값을 대체함.
    // 저장하지는 않음
    // return await this.userRepository.preload({
    //   id: 102,
    //   email: 'codefactory@naver.com',
    // })

    // // 삭제하기
    // await this.userRepository.delete(101);

    // 값을 증가 시킴
    // await this.userRepository.increment(
    //   {
    //     id: 20
    //   },
    //   'count',
    //   2
    // );

    // // 값을 감소 시킴
    // await this.userRepository.decrement(
    //   {
    //     id: 1
    //   },
    //   'count',
    //   2
    // );

    // // 조건에 맞는 항목 갯수 세아리기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   }
    // })

    // const sum = await this.userRepository.sum(
    //   'count',
    //   {
    //       email: ILike('%9%'),
    //   }
    // )
    // return sum;

    // const average = await this.userRepository.average(
    //   'count',
    //   {
    //     id: LessThan(100),
    //   })
    // return average;

    // // 최솟값
    // const min = await this.userRepository.minimum(
    //   'count',
    //   {
    //     id: LessThan(10),
    //   }
    // )
    // return min

    // const max = await this.userRepository.maximum(
    //   'count',
    //   {
    //     id: MoreThan(10),
    //   }
    // )
    // return max

    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    })
    return usersAndCount;
  }

  @Post('users')
  async postUsers() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`
      });
    }
  }

  @Get('users')
  async getUsers() {
    return await this.userRepository.find({
      where: {
        // // null 인가?
        // id: IsNull(),
        // // 이 안에 있는가?
        // id: In([1,3,48,99]),
        // // 사이 값
        // id: Between(10,15),
        // // 대소문자 구분 안하는 유사값
        // email: ILike('%GOOGLE%'),
        // // 유사값
        // email: Like('%0%'),
        // // 같은 경우
        // id: Equal(30),
        // // 크거나 같은 경우 가져오기
        // id: MoreThanOrEqual(30),
        // // 큰 경우 가져오기
        // id: MoreThan(30),
        // // 작거나 같은 경우 가져오기
        // id: LessThanOrEqual(30),
        // // 적은 경우 가져오기
        // id: LessThan(30),
        // // 아닌 경우 가져오기
        // id: Not(1),
      },
    });
  }

  // @Get('users')
  // async getUsers() {
  //   return await this.userRepository.find({
  //     select: {
  //       id: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       version: true,
  //       profile: {
  //         profileImg: true
  //       }
  //     },
  //     where: {},
  //     relations: {
  //       profile: true,
  //     },
  //     order: {
  //       id: "ASC",
  //     },
  //     skip: 1,
  //     take: 2,
  //   });
  // }

  @Patch('users/:id')
  async patchUsers(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
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

  @Delete('user/profile/:id')
  async deleteProfile(
    @Param('id') id: string
  ) {
    await this.profileRepository.delete(+id);

    return id;
  }
}
