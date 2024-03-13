import { IsString } from "class-validator";

export class UserDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;
  
    @IsString()
    cpf: string;
  
    @IsString()
    password: string;
}