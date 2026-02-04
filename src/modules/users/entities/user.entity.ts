import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: 'varchar',
        length: 10,
        default: 'USER',
    })
    role: 'USER' | 'ADMIN';

    @Column({ default: false })
    isActive: boolean;

    @Column({ length: 256 })
    password: string;

    @Column({ length: 256, nullable: true })
    phone: string;

    @Column({ length: 256, nullable: true })
    address: string;

    @Column({ nullable: true })
    codeId: string;

    @Column({ type: 'datetime', nullable: true })
    codeExpired: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
