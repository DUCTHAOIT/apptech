import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('category')
export class ProductCategory {
    @PrimaryGeneratedColumn()
    catagotyId!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ default: false })
    isActive: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
