import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class GetAllAppUserItemsDto {
    @IsString()
    @IsNotEmpty()
    id: string;
  }
  