import { Controller, Get, Post, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { BankDeposit } from './entities/bank-deposit.entity';
import { BankDepositService } from './bank-deposit.service';

@Controller('bank-deposit')
export class BankDepositController {
  constructor(private readonly bankDepositService: BankDepositService) {}

  @Get()
  async findAll(
    @Query('bankName') bankName?: string,
    @Query('depositType') depositType?: string,
    @Query('minAmount') minAmount?: number,
    @Query('maxAmount') maxAmount?: number,
    @Query('startDate') startDate?: Date | null,
    @Query('endDate') endDate?: Date | null
  ): Promise<BankDeposit[]> {
    console.log('ximen, entry');
    return this.bankDepositService.findAll(
      bankName,
      depositType,
      minAmount,
      maxAmount,
      startDate,
      endDate
    );
  }

  @Post()
  async create(@Body() deposit: BankDeposit): Promise<BankDeposit | null> {
    return this.bankDepositService.create(deposit);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() deposit: BankDeposit): Promise<BankDeposit | null> {
    return this.bankDepositService.update(id, deposit);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.bankDepositService.delete(id);
  }
}
