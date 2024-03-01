import { Body, Controller, Post } from '@nestjs/common';
import { ReserveService } from '../service/reserve.service';
import { createReserveDTO } from '../dto\'s/create-reserve.dto';

@Controller('reserve')
export class ReserveController {
    constructor(private readonly reserveService : ReserveService) {}

    @Post('/create')
    async createReserve(
        @Body() newReserve : createReserveDTO
    ) {
        return await this.reserveService.createUser(newReserve);
    }
}
