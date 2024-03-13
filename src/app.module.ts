import { Module, forwardRef } from '@nestjs/common';
import { ReserveModule } from './reserve/reserve.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
    ReserveModule,
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

