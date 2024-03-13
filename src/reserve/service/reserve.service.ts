import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReserveEntity } from '../entity/reserve.entity';
import { Repository } from 'typeorm';
import { createReserveDTO } from '../dto\'s/create-reserve.dto';

@Injectable()
export class ReserveService {
    constructor(
        @InjectRepository(ReserveEntity)
        private readonly reserveRepository : Repository <ReserveEntity>
    ){}

    async createUser(newReserve : createReserveDTO) {
        try {
            const reserveData = this.reserveRepository.create(newReserve);

            if(!reserveData) {
                throw new InternalServerErrorException("Erro ao criar reserva");
            }

            const dates = await this.reserveRepository.query(`
                SELECT json_build_object('date', date) AS data FROM "Reserve";
            `);

            dates.map((data) => {
                let aux = (new Date(data.data.date).toISOString().split('T')[0]);

                if( aux === newReserve.date ) {
                    throw new BadRequestException('A data selecionada não está disponivel para reserva!');
                }
            });

            await this.reserveRepository.save(reserveData);

            return reserveData 
            ? {
                message: 'Sucesso ao criar reserva',
                reserve: reserveData
            }
            : {
                message: 'Falha ao criar reserva',
                reserve: []
            }
        } catch (error) {
            throw error instanceof HttpException 
            ? error 
            : new InternalServerErrorException(error.message)
        }
    }

    async findAllDates() {
        try {
            const dates = await this.reserveRepository.query(`
                SELECT json_build_object('date', date) AS data FROM "Reserve";
            `);

            return dates
            ? {
                message: 'Busca realizada com sucesso!',
                dates: dates
            }
            : {
                message: 'Falha ao realizar busca!',
                dates: []
            }
        } catch (error) {
            throw error instanceof HttpException 
            ? error 
            : new InternalServerErrorException(error.message)
        }
    }

}
