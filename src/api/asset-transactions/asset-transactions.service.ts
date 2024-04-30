import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import moment from 'moment-timezone';
import { AssetTransactionDto } from '@src/api/asset-transactions/dto/asset-transaction.dto';

@Injectable()
export class AssetTransactionsService {
  constructor(private dataSource: DataSource) {}

  async getAllTransactions() {
    return this.dataSource.query('select * from transactions');
  }

  async addAssetTransaction(assetTransaction: AssetTransactionDto) {
    const nowInBeijing = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

    //   要去更新 asset transaction 表 添加一个记录
    // const results =
    // 插入新的交易记录
    const insertQuery = `
      INSERT INTO transactions (assetAccountId, transactionType, amount, transactionDate, remark, transferToAccountId)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await this.dataSource.query(insertQuery, [
      assetTransaction.assetAccountId,
      assetTransaction.transactionType,
      assetTransaction.amount,
      nowInBeijing, // 使用 API 调用时的时间作为 transactionDate
      assetTransaction.remark,
      assetTransaction.transferToAccountId,
    ]);

    // 要去更新 asset management 的表， 更新现有的 account
    const accountId = assetTransaction.assetAccountId;
    const accountQuery = 'SELECT * FROM asset_accounts WHERE id = ?';
    const accounts = await this.dataSource.query(accountQuery, [accountId]);

    if (accounts.length === 0) {
      throw new Error('Account not found');
    }

    let newBalance = parseFloat(accounts[0].balance);

    const updateAccountQuery = `
      UPDATE asset_accounts
      SET balance = ?, updateTime = ?
      WHERE id = ?
    `;

    // 根据交易类型更新余额
    switch (assetTransaction.transactionType) {
      case 'deposit':
        newBalance += assetTransaction.amount;
        break;
      case 'withdrawal':
        newBalance -= assetTransaction.amount;
        break;
      case 'transfer': {
        newBalance -= assetTransaction.amount;
        let newBalanceInTargetAccount = 0;
        // 如果是跨汇率转账， 那么会在这里直接提供
        // 转账之后的利息+本金在该汇率下的值
        // 直接取这个值就好了
        if (assetTransaction.targetAccountAmount && assetTransaction.targetAccountAmount !== 0) {
          newBalanceInTargetAccount = assetTransaction.targetAccountAmount;
        } else {
          newBalanceInTargetAccount = assetTransaction.amount;
        }

        // 还需要更新接收账户的余额
        const transferAccount = await this.dataSource.query(accountQuery, [
          assetTransaction.transferToAccountId,
        ]);
        if (transferAccount.length === 0) {
          throw new Error('Transfer account not found');
        }
        const newTransferBalance =
          parseFloat(transferAccount[0].balance) + newBalanceInTargetAccount;
        await this.dataSource.query(updateAccountQuery, [
          newTransferBalance,
          nowInBeijing,
          assetTransaction.transferToAccountId,
        ]);
        break;
      }
      default:
        throw new Error('Invalid transaction type');
    }

    // 更新当前账户余额
    await this.dataSource.query(updateAccountQuery, [
      newBalance,
      nowInBeijing,
      assetTransaction.assetAccountId,
    ]);

    // 返回更新后的账户信息
    const updatedAccount = await this.dataSource.query(accountQuery, [
      assetTransaction.assetAccountId,
    ]);
    return updatedAccount[0];
  }
}
