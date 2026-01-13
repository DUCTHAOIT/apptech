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
    id: number;

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

    @Column({ default: true })
    isActive: boolean;
    @Column({ length: 256 })
    // @IsNotEmpty()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
