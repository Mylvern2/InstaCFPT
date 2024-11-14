import { Body, Controller, Get, Post, Patch, Delete, Param, Header, Req } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { User } from 'src/models/user.model'
import { UserService } from 'src/services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll(): Promise<User[]> {
    console.log('controler @GET : findAll() get users')
    const users = await this.userService.getUsers()
    .then((users) => {
      console.log('controler @GET : findAll() get users : users :', users)
      return users
    } )
    return users
  }

  @Get(':name')
  async findIdByName(@Param('name') name: string) : Promise<string> {
    return (await this.userService.getUser(name))._id.toString();
  }

  @Post('add')
  async add(@Body() body): Promise<User> {
    return this.userService.addUser(body.name, body.password)
  }

  @Patch('update')
  async editName(@Body() body) : Promise<User | boolean> {
    const id = new ObjectId(body.id);
    return this.userService.editName(id, body.username);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string, @Req() request: Request) : Promise<boolean>
  {
    const userId = new ObjectId(id);
    return this.userService.deleteUser(userId);
  }
}
