
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('packets')
export class Packet {
    @PrimaryGeneratedColumn()
    packetId: number;

    @Column({ length: 100 })
    packetName: string;

    @Column({ length: 100 })
    description: string;

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: 0 })
    packetPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
