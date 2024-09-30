import { Body, Controller, Get, Post } from '@nestjs/common'
import { User } from 'src/models/user.model'
import { UserService } from 'src/services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  essai : number = 0;
  @Get()
  async findAll(): Promise<User[]> {
    console.log('controler @GET : findAll() get users')
    const users = await this.userService.getUsers()
    .then((users) => {
      this.essai++
      console.log('controler @GET : essai :', this.essai)
      console.log('controler @GET : findAll() get users : users :', users)
      return users
    } )
    return users
  }

  @Post('add')
  async add(@Body() body): Promise<User> {
    return this.userService.addUser(body.name)
  }
}
