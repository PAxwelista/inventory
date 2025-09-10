import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  app_user_id:string

  @IsOptional()
  options?: any;
}
