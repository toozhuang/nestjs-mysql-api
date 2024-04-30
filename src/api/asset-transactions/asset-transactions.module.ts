import { Module } from '@nestjs/common';
import { AssetTransactionsController } from './asset-transactions.controller';
import { AssetTransactionsService } from './asset-transactions.service';
import { RouterModule } from '@nestjs/core';
import { ADMIN_PREFIX } from '@src/constants';

@Module({
  imports: [
    RouterModule.register([
      {
        path: ADMIN_PREFIX, // 指定项目名称
        module: AssetTransactionsModule,
      },
    ]),
  ],
  controllers: [AssetTransactionsController],
  providers: [AssetTransactionsService],
})
export class AssetTransactionsModule {}
