CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '食材ID',
  `name` varchar(50) NOT NULL COMMENT '食材名称',
  `image` varchar(255) DEFAULT NULL COMMENT '食材图片',
  `calories` int(11) NOT NULL COMMENT '卡路里',
  `protein` int(11) NOT NULL COMMENT '蛋白质',
  `fat` int(11) NOT NULL COMMENT '脂肪',
  `carbohydrate` int(11) NOT NULL COMMENT '碳水化合物',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='食材表';

-- 菜谱表(Recipe Table)
CREATE TABLE `recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜谱ID',
  `name` varchar(100) NOT NULL COMMENT '菜谱名称',
  `image` varchar(255) DEFAULT NULL COMMENT '菜谱图片',
  `description` text NOT NULL COMMENT '菜谱描述',
  `difficulty` int(11) NOT NULL COMMENT '难度等级',
  `content` varchar(255) DEFAULT NULL COMMENT 'Markdown文件地址',
  `user_id` int(11) NOT NULL COMMENT '创建者ID',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜谱表';

-- 菜谱食材表(Recipe Ingredient Table)
CREATE TABLE `recipe_ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `recipe_id` int(11) NOT NULL COMMENT '菜谱ID',
  `ingredient_id` int(11) NOT NULL COMMENT '食材ID',
  `quantity` int(11) NOT NULL COMMENT '食材数量',
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipe_ingredient_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe_ingredient_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜谱食材表';

-- 菜谱步骤表(Recipe Step Table)
CREATE TABLE `recipe_step` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `recipe_id` int(11) NOT NULL COMMENT '菜谱ID',
  `step_number` int(11) NOT NULL COMMENT '步骤编号',
  `description` text NOT NULL COMMENT '步骤描述',
  `image` varchar(255) DEFAULT NULL COMMENT '步骤图片',
  PRIMARY KEY (`id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `recipe_step_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜谱步骤表';

-- 收藏表(Collection Table)
CREATE TABLE `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `recipe_id` int(11) NOT NULL COMMENT '菜谱ID',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收藏表';




-- 食材表(Ingredient Table)
INSERT INTO `ingredient` (`id`, `name`, `image`, `calories`, `protein`, `fat`, `carbohydrate`) VALUES
(1, '鸡蛋', 'egg.jpg', 78, 6, 5, 0),
(2, '面粉', 'flour.jpg', 364, 10, 1, 76),
(3, '牛奶', 'milk.jpg', 42, 4, 2, 5),
(4, '菠菜', 'spinach.jpg', 23, 2, 0, 3);

-- 菜谱表(Recipe Table)
INSERT INTO `recipe` (`id`, `name`, `image`, `description`, `difficulty`, `content`, `user_id`) VALUES
(1, '煎蛋', 'fried_egg.jpg', '简单易做的煎蛋', 1, 'egg.md', 1),
(2, '面包', 'bread.jpg', '简单的面包制作', 2, 'bread.md', 1),
(3, '菠菜牛奶', 'spinach_milk.jpg', '菠菜牛奶的做法', 3, 'spinach_milk.md', 1);

-- 菜谱食材表(Recipe Ingredient Table)
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`) VALUES
(1, 1, 1, 2),
(2, 2, 2, 500),
(3, 2, 3, 250),
(4, 3, 3, 200);

-- 菜谱步骤表(Recipe Step Table)
INSERT INTO `recipe_step` (`id`, `recipe_id`, `step_number`, `description`, `image`) VALUES
(1, 1, 1, '准备两个鸡蛋', 'egg1.jpg'),
(2, 1, 2, '打散鸡蛋', 'egg2.jpg'),
(3, 1, 3, '热锅加油，倒入鸡蛋液', 'egg3.jpg'),
(4, 2, 1, '准备面粉和牛奶', 'bread1.jpg'),
(5, 2, 2, '混合面粉和牛奶，揉成面团', 'bread2.jpg'),
(6, 2, 3, '发酵面团', 'bread3.jpg'),
(7, 3, 1, '准备菠菜和牛奶', 'spinach_milk1.jpg'),
(8, 3, 2, '混合菠菜和牛奶，搅拌均匀', 'spinach_milk2.jpg'),
(9, 3, 3, '倒入杯中，即可食用', 'spinach_milk3.jpg');

-- 收藏表(Collection Table)
INSERT INTO `collection` (`id`, `user_id`, `recipe_id`) VALUES
(1, 1, 2),
(2, 1, 1);
