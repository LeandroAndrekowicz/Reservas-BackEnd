import { Module } from '@nestjs/common';
import { ReserveController } from './controller/reserve.controller';
import { ReserveService } from './service/reserve.service';
import { ReserveEntity } from './entity/reserve.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReserveEntity])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
