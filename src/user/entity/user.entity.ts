import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('User')
export class UserEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    cpf: string;

    @Column()
    password: string;
}