import { Module } from '@nestjs/common';
import { ReserveModule } from './reserve/reserve.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
    ReserveModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

