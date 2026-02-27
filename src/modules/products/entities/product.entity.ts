import { Category } from "src/modules/category/entities/product-category.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";



@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    categoryId: number;

    // ✅ JOIN CATEGORY
    @ManyToOne(() => Category)
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @Column({ length: 100 })
    name: string;
    // @Column({
    //     type: "json",
    //     nullable: true,
    //     default: []
    // })
    // images: string[];

    @Column({ type: 'text', nullable: true })
    shortDesc: string;

    @Column({ type: 'longtext', nullable: true })
    content: string;

    @Column({ default: false })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
