import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateAppDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
