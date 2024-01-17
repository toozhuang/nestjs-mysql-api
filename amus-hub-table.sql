/***
****模仿 Toshl， 创建 tosh 的table
***/
CREATE TABLE toshl (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  account VARCHAR(50),
  category VARCHAR(50),
  tag VARCHAR(50),
  expense DECIMAL(10,2),
  income DECIMAL(10,2),
  currency VARCHAR(10),
  currency_amount DECIMAL(10,2),
  main_currency VARCHAR(10),
  description VARCHAR(255),
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `UK_date_currency_amount_deleted_at` (`currency_amount`, `deleted_at`, `date`)
);

INSERT INTO toshl (date, account, category, tag, expense, income, currency, currency_amount, main_currency, description)
VALUES
('2023-01-02', '香港', '出行交通', '🚕 的士', 92.00, 0, 'CNY', 106.99, 'HKD', ''),
('2023-01-02', '香港', '食品及饮料', '外出吃饭', 45.00, 0, 'CNY', 52.33, 'HKD', ''),
('2023-01-02', '香港', '出行交通', '🚌 大巴', 120.00, 0, 'HKD', 120.00, 'HKD', ''),
('2023-01-02', '香港', '食品及饮料', '超市购物', 186.00, 0, 'HKD', 186.00, 'HKD', ''),
('2023-01-02', '香港', '食品及饮料', '超市购物', 216.00, 0, 'HKD', 216.00, 'HKD', ''),
('2023-02-02', '香港', '生活支出', '日用品', 20.00, 0, 'CNY', 23.30, 'HKD', '淘宝购买，锡纸'),
('2023-02-02', '香港', '人情费用', '送礼请客', 420.00, 0, 'HKD', 420.00, 'HKD', '媳妇学生，利是');
