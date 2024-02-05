CREATE TABLE `bank_deposit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bankName` varchar(255) NOT NULL,
  `depositType` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `interestRate` decimal(10,2),
  `depositDate` datetime NOT NULL,
  `endDate` datetime,
  `maturityInterest` decimal(10,2),
  `term` int,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- insert demo data
INSERT INTO `bank_deposit` (`bankName`, `depositType`, `amount`, `interestRate`, `depositDate`, `endDate`, `maturityInterest`, `term`)
VALUES
  ('中国银行', '定期存款', 10000.00, 2.50, '2021-01-01 00:00:00', '2021-06-30 00:00:00', 125.00, 180),
  ('工商银行', '活期存款', 5000.00, 0.50, '2021-02-15 00:00:00', NULL, NULL, NULL),
  ('建设银行', '定期存款', 20000.00, 3.00, '2021-03-01 00:00:00', '2022-03-01 00:00:00', 600.00, 365),
  ('农业银行', '活期存款', 8000.00, 0.25, '2021-04-01 00:00:00', NULL, NULL, NULL);
