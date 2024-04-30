import { Body, Controller, Get, Post } from '@nestjs/common';
import { AssetManagementService } from '@src/api/asset-management/asset-management.service';
import { AssetAccount } from '@src/api/asset-management/dto/asset-account.dto';

@Controller('asset-management')
export class AssetManagementController {
  constructor(private readonly assetManagementServices: AssetManagementService) {}

  @Get('/asset-accounts')
  async getAllAssetAccounts(): Promise<AssetAccount[]> {
    return this.assetManagementServices.getAllAssetAccounts();
  }

  //
  // @Get('/asset-accounts/:id')
  // async getAssetAccountById(@Param('id') id: number): Promise<AssetAccount> {
  //   return this.appService.getAssetAccountById(id);
  // }
  //
  @Post('/asset-accounts')
  async createAssetAccount(@Body() assetAccount: AssetAccount): Promise<AssetAccount> {
    return this.assetManagementServices.createAssetAccount(assetAccount);
  }

  //
  // @Put('/asset-accounts/:id')
  // async updateAssetAccount(
  //   @Param('id') id: number,
  //   @Body() assetAccount: AssetAccount
  // ): Promise<AssetAccount> {
  //   return this.appService.updateAssetAccount(id, assetAccount);
  // }
  //
  // @Delete('/asset-accounts/:id')
  // async deleteAssetAccount(@Param('id') id: number): Promise<void> {
  //   return this.appService.deleteAssetAccount(id);
  // }
  //
  // @Get('/transactions')
  // async getAllTransactions(): Promise<Transaction[]> {
  //   return this.appService.getAllTransactions();
  // }
  //
  // @Get('/transactions/:id')
  // async getTransactionById(@Param('id') id: number): Promise<Transaction> {
  //   return this.appService.getTransactionById(id);
  // }
  //
  // @Post('/transactions')
  // async createTransaction(@Body() transaction: Transaction): Promise<Transaction> {
  //   return this.appService.createTransaction(transaction);
  // }
  //
  // @Put('/transactions/:id')
  // async updateTransaction(
  //   @Param('id') id: number,
  //   @Body() transaction: Transaction
  // ): Promise<Transaction> {
  //   return this.appService.updateTransaction(id, transaction);
  // }
  //
  // @Delete('/transactions/:id')
  // async deleteTransaction(@Param('id') id: number): Promise<void> {
  //   return this.appService.deleteTransaction(id);
  // }
}
