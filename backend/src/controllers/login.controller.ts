import { Body, Controller, Post, HttpException, HttpCode, HttpStatus, Get, Req } from '@nestjs/common'
import { User } from 'src/models/user.model'
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service'
const jwt = require('jsonwebtoken');
require('dotenv').config()

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UserService, private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() body): Promise<string> {
    const user = await this.userService.getUser(body.name);
    if (user === null || user.password !== body.password)
    {
        throw new HttpException(`User or password incorrect`, HttpStatus.BAD_REQUEST);
    }
    const secret = process.env.SECRET_KEY;
    const timestamp = Date.now() // horodatage en millisecondes
    const ONE_HOUR = 1000*60*60 // 1000 millisecondes = 1 seconde
    const exp = timestamp + ONE_HOUR
    const payload = { name: user.name, id: user._id, exp: exp};
    const token = jwt.sign(payload, secret)
    return token;
  }

  
  @Get('username')
  getUsername(@Req() request: Request) : string
  {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    return decoded.name
  }

}
