import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./service/auth.service";
import { UserService } from "../user/service/user.service"; 
import { UserEntity } from "../user/entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION_IN_SECONDS
            }
        }),
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => UserModule)
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
