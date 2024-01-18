/**
* date: 2024-01-18, 周四, 21:22
* author: Wang
* feature： TOSHL 的 entity
*/
import { SharedEntity } from '@src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('toshl')
export class ToshlEntity extends SharedEntity {

  @Column({
    type: 'datetime',
    name: 'date',
    comment: '记录这个record的时间',
  })
  date!: Date;


  @Column({
    type: 'varchar',
    length: 50,
    name: 'account',
    nullable: true,
    comment: '这个账户的名称',
  })
  account!: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'category',
    nullable: true,
    comment: '分类',
  })
  category!: string;


  @Column({
    type: 'varchar',
    length: 50,
    name: 'tag',
    nullable: true,
    comment: '标签',
  })
  tag!: string;


  @Column({ type: 'decimal',name: 'expense', precision: 10, scale: 2 })
  expense!: number;

  @Column({ type: 'decimal',name: 'income', precision: 10, scale: 2 })
  income!: number;

  @Column({ length: 10 ,name: 'currency',})
  currency!: string;

  @Column({ type: 'decimal', name: 'currency_amount',precision: 10, scale: 2 })
  currency_amount!: number;

  @Column({ length: 10,name: 'main_currency', })
  main_currency!: string;

  @Column({ length: 255,name: 'description', })
  description!: string;

}
