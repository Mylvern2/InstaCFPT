import { Body, Controller, Get, Post, Patch, Delete, Param, Header, Req, HttpException, HttpStatus } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { User } from 'src/models/user.model'
import { LoginService } from 'src/services/login.service'
import { UserService } from 'src/services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly loginService: LoginService) {}
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
  async editName(@Body() body, @Req() request: Request) : Promise<User | boolean> {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    return this.userService.editName(decoded.id, body.username);
  }

  @Delete('delete')
  async deleteUser(@Req() request: Request) : Promise<void>
  {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    console.log(decoded.id)
    if (!this.userService.deleteUser(decoded.id))
    {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }
  }
}
