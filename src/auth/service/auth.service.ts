import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/service/user.service";
import { compareSync as bcryptCompareSync } from 'bcrypt';


@Injectable()
export class AuthService {
    constructor ( 
        private readonly  userRep : UserService,
        private readonly  jwtRep : JwtService
    ) {}

    async signIn( cpf : string, password : string) {

        const foundUser = await this.userRep.findUserByCpf(cpf)
    
        if(!foundUser || !bcryptCompareSync(password, (foundUser).password)){
            throw new UnauthorizedException("Email ou senha inválidos");
        }

        const tokenData = {
            id: foundUser.id,
            name: foundUser.name,
            cpf: foundUser.cpf,
        }

        try {
            const token = this.jwtRep.sign(tokenData);            

            return {
                token : token
            } 

        } catch (error) {

            console.log(error);
            
            throw error instanceof HttpException 
            ? error 
            : new InternalServerErrorException(error.message)
        }
    }

    async extractToken(authorization : string) : Promise<any>  {
        try {
            // Extraí o token e o tipo
            if(!authorization) {
                throw new UnauthorizedException('Necessario envio do Token')
            }

            const [type, token] = authorization.split(' ') ?? [];

            if(type.toLowerCase() !== 'bearer') {
                throw new UnauthorizedException('Token deve ser do tipo bearer');
            }

            if(!token) {
                throw new UnauthorizedException('Token nao informado.');
            }

            const payload = await this.jwtRep
                .verifyAsync(token, {secret: process.env.JWT_SECRET})
                .catch(() => {
                    throw new UnauthorizedException('Token inválido');
                })

            return payload;
        } catch (error) {
            throw error instanceof HttpException
            ? error
            : new InternalServerErrorException();
        }
    }
}