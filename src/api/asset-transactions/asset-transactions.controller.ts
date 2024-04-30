import { Body, Controller, Get, Post } from '@nestjs/common';
import { AssetAccount } from '@src/api/asset-management/dto/asset-account.dto';
import { AssetTransactionsService } from '@src/api/asset-transactions/asset-transactions.service';
import { AssetTransactionDto } from '@src/api/asset-transactions/dto/asset-transaction.dto';

@Controller('asset-transactions')
export class AssetTransactionsController {
  constructor(private readonly apiService: AssetTransactionsService) {}

  @Get('/transactions')
  async getAllAssetTransaction(): Promise<AssetAccount[]> {
    return this.apiService.getAllTransactions();
  }

  @Post('/transactions')
  async addAssetTransaction(@Body() req: AssetTransactionDto): Promise<AssetAccount[]> {
    return this.apiService.addAssetTransaction(req);
  }
}
