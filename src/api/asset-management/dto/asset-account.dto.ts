import { IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AssetAccount {
  @Type(() => String)
  @IsNotEmpty({ message: '银行信息不能为空' })
  bankName!: string;

  @IsNotEmpty()
  accountHolder!: string;

  @IsEnum(['saving', 'deposit', 'other'])
  accountType!: 'saving' | 'deposit' | 'other';

  @IsNumber()
  @Min(0)
  balance!: number;

  category?: string;

  ownerName?: string;

  ownerID?: string;

  @IsNotEmpty({ message: '汇率不能为空' })
  currency!: string;
}
