import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BankDeposit {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;

  @Column()
  bankName!: string;

  @Column()
  depositType!: string;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  interestRate!: number;

  @Column({ type: 'timestamp', nullable: true })
  depositDate!: Date;

  @Column({ nullable: true, type: 'timestamp' })
  endDate!: Date | null;

  @Column({ nullable: true, type: 'float' })
  maturityInterest!: number | null;

  @Column({ nullable: true, type: 'int' })
  term!: number | null;
}
