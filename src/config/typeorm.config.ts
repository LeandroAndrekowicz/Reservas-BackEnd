import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


@Injectable()
export class DatabaseConfigService {
    constructor (private readonly configService : ConfigService) {}

    createTypeOrmOptions() : TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            synchronize: true,
            entities: [__dirname + '/../**/*.entity.{js,ts}']
        }
    }
}