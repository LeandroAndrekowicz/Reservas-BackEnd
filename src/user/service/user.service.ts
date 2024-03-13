import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    
    constructor ( 
        @InjectRepository(UserEntity)
        private readonly userRep : Repository <UserEntity>
    ) {}

    async findUserByCpf( cpf : string) { 
        const user = await this.userRep.findOne({
            where: {cpf : cpf},
        })

        if(!user) {
            return null;
        }

        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            password: user.password
        }
    }
}
