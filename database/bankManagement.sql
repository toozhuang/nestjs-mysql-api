-- 主要是记录我所有的存款以及定息活期的地方， 要和我银行的数据定时的同步

-- accounts 表中新增了 interestRate 和 maturityDate 两个字段，用于记录账户的利率和到期时间。同时，新增了 transactions 表，
-- 用于记录账户的交易记录；新增了 interest_records 表，用于记录账户到期后的利息；
-- 新增了 account_types 表，用于记录账户类型；新增了 account_type_details 表，用于记录账户和账户类型的关联关系。

-- 版本 1 最开始的最简单的表格
-- 后期是从这个基础上开始衍生

CREATE TABLE asset_accounts (
  id INT NOT NULL AUTO_INCREMENT,
  bankName VARCHAR(50) NOT NULL,
  accountHolder VARCHAR(50) NOT NULL,
  accountType ENUM('saving', 'deposit', 'other') NOT NULL,  #后续还可以添加成更多
  balance DECIMAL(10, 2) NOT NULL,
  createTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  category VARCHAR(50) DEFAULT NULL,
  ownerName VARCHAR(50) DEFAULT NULL,
  ownerID VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id),
  CHECK (balance >= 0)
);


CREATE TABLE transactions (
  id INT NOT NULL AUTO_INCREMENT,
  assetAccountId INT NOT NULL,
  transactionType ENUM('deposit', 'withdrawal','transfer') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  updateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  transactionDate DATETIME NOT NULL,
  remark VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (assetAccountId) REFERENCES asset_accounts(id)
);
