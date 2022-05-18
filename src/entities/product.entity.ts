import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, unique: true })
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  img_url: string;

  @Column({ length: 120 })
  type: string;

  @Column()
  quantity_stock: number;

  @Column({ nullable: true })
  rating: number;

  @Column()
  label: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}