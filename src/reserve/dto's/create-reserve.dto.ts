import { IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


export class createReserveDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsDateString()
    @IsNotEmpty()
    date: string;
}