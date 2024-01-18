import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToshlEntity } from '@src/api/toshl/entities/toshl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToshlService {
  constructor(@InjectRepository(ToshlEntity)
              private readonly toshEntity: Repository<ToshlEntity>) {
  }

  async getToshlList(queryOption: any) {
    const { account, category, tag, currency, startDate, endDate, pageSize=10, pageNumber =1 } = queryOption;
    const queryBuilder = this.toshEntity.createQueryBuilder('toshl');

    if (account) {
      queryBuilder.andWhere('toshl.account = :account', { account });
    }
    if (category) {
      queryBuilder.andWhere('toshl.category = :category', { category });
    }
    if (tag) {
      queryBuilder.andWhere('toshl.tag = :tag', { tag });
    }
    if (currency) {
      queryBuilder.andWhere('toshl.currency = :currency', { currency });
    }
    if (startDate) {
      queryBuilder.andWhere('toshl.date >= :startDate', { startDate });
    }
    if (endDate) {
      queryBuilder.andWhere('toshl.date <= :endDate', { endDate });
    }

    const [toshlList, totalCount] = await queryBuilder
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy('toshl.date', 'DESC')
      .getManyAndCount();

    return {
      data:toshlList,
      total:totalCount,
      pageSize,
      pageNumber,
    };
  }
}
