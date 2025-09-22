import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { SigninDto } from './dto/signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userData: SignupDto): Promise<string> {
    const user = await this.usersService.signup(userData);
    return this.usersService.generateJwt(user);
  }
  @Post('signin')
  async signin(@Body() userData: SigninDto): Promise<string> {
    const user = await this.usersService.signin(userData);
    return this.usersService.generateJwt(user);
  }
}
