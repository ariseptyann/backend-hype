import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Citys } from './Citys';

@Entity()
export class Provinces {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Citys, (citys) => citys.province, {cascade: true})
  citys: Citys[]
}