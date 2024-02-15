import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDeposit } from './entities/bank-deposit.entity';
import { BankDepositService } from './bank-deposit.service';
import { BankDepositController } from './bank-deposit.controller';
import { RouterModule } from '@nestjs/core';
import { ADMIN_PREFIX } from '@src/constants';

@Module({
  imports: [
    RouterModule.register([
      {
        path: ADMIN_PREFIX, // 指定项目名称
        module: BankDepositModule,
      },
    ]),
    TypeOrmModule.forFeature([BankDeposit]),
  ],
  controllers: [BankDepositController],
  providers: [BankDepositService],
})
export class BankDepositModule {}
