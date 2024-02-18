import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankDeposit } from './entities/bank-deposit.entity';

@Injectable()
export class BankDepositService {
  constructor(
    @InjectRepository(BankDeposit)
    private readonly bankDepositRepository: Repository<BankDeposit>
  ) {}

  async findAll(
    bankName?: string,
    depositType?: string,
    minAmount?: number,
    maxAmount?: number,
    startDate?: Date | null,
    endDate?: Date | null
  ): Promise<any> {
    console.log('ximen');
    const pageSize = 10;
    const pageNumber = 1;
    const query = this.bankDepositRepository.createQueryBuilder('deposit');

    if (bankName) {
      query.andWhere('deposit.bankName = :bankName', { bankName });
    }
    if (depositType) {
      query.andWhere('deposit.depositType = :depositType', { depositType });
    }
    if (minAmount) {
      query.andWhere('deposit.amount >= :minAmount', { minAmount });
    }
    if (maxAmount) {
      query.andWhere('deposit.amount <= :maxAmount', { maxAmount });
    }
    if (startDate) {
      query.andWhere('deposit.depositDate >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('deposit.endDate <= :endDate', { endDate });
    }

    const [bankList, totalCount] = await query
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy('deposit.depositDate', 'DESC')
      .getManyAndCount();

    return {
      data: bankList,
      total: totalCount,
      pageSize,
      pageNumber,
    };
  }

  /**
   * 创建银行存款 但不会有错误的情形出现的
   * @param deposit
   */
  async create(deposit: BankDeposit): Promise<BankDeposit | null> {
    if (deposit.depositType === '活期存款') {
      deposit.endDate = null;
      deposit.term = null;
      deposit.maturityInterest = null;
    } else if (deposit.depositType === '定期存款') {
      if (!deposit.endDate || deposit.endDate <= deposit.depositDate) {
        throw new HttpException('到期时间必须晚于存款时间', HttpStatus.OK);
      }
      const days = Math.round(
        (deposit.endDate.getTime() - deposit.depositDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      deposit.term = days;
      deposit.maturityInterest = (deposit.amount * deposit.interestRate * days) / (365 * 100);
    } else {
      throw new HttpException('存款类型不合法', HttpStatus.OK);
    }
    const newDeposit = await this.bankDepositRepository.save(deposit);
    return this.findOne(newDeposit.id);
  }

  async update(id: number, deposit: BankDeposit): Promise<BankDeposit | null> {
    if (deposit.depositType === '活期存款') {
      deposit.endDate = null;
      deposit.term = null;
      deposit.maturityInterest = null;
    } else if (deposit.depositType === '定期存款') {
      if (!deposit.endDate || deposit.endDate <= deposit.depositDate) {
        throw new HttpException('到期时间必须晚于存款时间', HttpStatus.OK);
      }
      const days = Math.round(
        (deposit.endDate.getTime() - deposit.depositDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      deposit.term = days;
      deposit.maturityInterest = (deposit.amount * deposit.interestRate * days) / (365 * 100);
    } else {
      throw new HttpException('存款类型不合法', HttpStatus.OK);
    }
    await this.bankDepositRepository.update(id, deposit);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.bankDepositRepository.update(id, {
      amount: () => 'amount * -1',
    });
  }

  async findOne(id: number): Promise<BankDeposit | null> {
    return this.bankDepositRepository.findOne({ where: { id: id } });
  }
}
