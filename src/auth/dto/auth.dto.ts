import { IsNumber, IsString } from "class-validator";


export class AuthResponseDTO {
    @IsString()
    token: string;

    @IsNumber()
    expiresIn: number;
}