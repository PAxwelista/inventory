import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() userData : CreateUserDto) : Promise<User>{
    return this.usersService.createUser(userData)
  }
}
