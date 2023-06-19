import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Provinces } from './Provinces';

@Entity()
export class Citys {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Provinces, (province) => province.citys)
  province: Provinces[];
}