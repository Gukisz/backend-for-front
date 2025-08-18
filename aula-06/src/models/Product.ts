import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 150, nullable: false })
    name!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price!: number;

    @ManyToOne(() => Category, category => category.products)
    category!: Category;
}
