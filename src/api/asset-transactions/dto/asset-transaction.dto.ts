import { IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';

export class AssetTransactionDto {
  @IsNotEmpty()
  assetAccountId!: number;

  @IsEnum(['deposit', 'withdrawal', 'transfer'])
  transactionType!: 'deposit' | 'withdrawal' | 'transfer';

  @IsNumber()
  @Min(0)
  amount!: number;

  updateTime?: Date;

  @IsNotEmpty()
  transactionDate!: Date;

  remark?: string;

  transferToAccountId!: number;

  @IsNotEmpty({ message: '汇率不能为空' })
  currency!: string;

  targetAccountAmount?: number;
}
