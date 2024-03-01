import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('Reserve')
export class ReserveEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    date: Date;

    @CreateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
    updated_at: Date;

    @DeleteDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
    deleted_at: Date;
}