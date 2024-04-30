import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AssetAccount } from '@src/api/asset-management/dto/asset-account.dto';

@Injectable()
export class AssetManagementService {
  constructor(private dataSource: DataSource) {}

  async getAllAssetAccounts(): Promise<AssetAccount[]> {
    const results = await this.dataSource.query('SELECT * FROM asset_accounts');
    console.log(results);
    return results.map((item: AssetAccount) => {
      return {
        ...item,
        balance: Number.parseFloat(item.balance as any),
      };
    });
  }

  // async getAssetAccountById(id: number): Promise<AssetAccount> {
  //   const connection = await getConnection();
  //   const results = await connection.query('SELECT * FROM asset_accounts WHERE id = ?', [id]);
  //   return results[0];
  // }
  //
  async createAssetAccount(assetAccount: AssetAccount): Promise<any> {
    const results = await this.dataSource.query('INSERT INTO asset_accounts SET ?', [assetAccount]);
    const createdId = results.insertId;
    return { ...assetAccount, id: createdId };
  }

  //
  // async updateAssetAccount(id: number, assetAccount: AssetAccount): Promise<AssetAccount> {
  //   const connection = await getConnection();
  //   await connection.query('UPDATE asset_accounts SET ? WHERE id = ?', [assetAccount, id]);
  //   return { ...assetAccount, id };
  // }
  //
  // async deleteAssetAccount(id: number): Promise<void> {
  //   const connection = await getConnection();
  //   await connection.query('DELETE FROM asset_accounts WHERE id = ?', [id]);
  // }
  //
  // async getAllTransactions(): Promise<Transaction[]> {
  //   const connection = await getConnection();
  //   const results = await connection.query('SELECT * FROM transactions');
  //   return results;
  // }
  //
  // async getTransactionById(id: number): Promise<Transaction> {
  //   const connection = await getConnection();
  //   const results = await connection.query('SELECT * FROM transactions WHERE id = ?', [id]);
  //   return results[0];
  // }
  //
  // async createTransaction(transaction: Transaction): Promise<Transaction> {
  //   const connection = await getConnection();
  //   const results = await connection.query('INSERT INTO transactions SET ?', [transaction]);
  //   const createdId = results.insertId;
  //   return { ...transaction, id: createdId };
  // }
  //
  // async updateTransaction(id: number, transaction: Transaction): Promise<Transaction> {
  //   const connection = await getConnection();
  //   await connection.query('UPDATE transactions SET ? WHERE id = ?', [transaction, id]);
  //   return { ...transaction, id };
  // }
  //
  // async deleteTransaction(id: number): Promise<void> {
  //   const connection = await getConnection();
  //   await connection.query('DELETE FROM transactions WHERE id = ?', [id]);
  // }
}
