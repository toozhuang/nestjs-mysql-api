import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class RecipeService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async findAll() {
    const list = await this.dataSource.query(
      'select * from recipe join account on recipe.user_id = account.id'
    );
    return list;
  }
}
