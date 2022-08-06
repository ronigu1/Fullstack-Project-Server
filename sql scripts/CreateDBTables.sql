-- DROP TABLE IF EXISTS `foodmania`.`users`

CREATE TABLE `foodmania`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));

CREATE TABLE `foodmania`.`watchedrecipes` (
  `user_id` INT NOT NULL,
  `recipe_id_1` VARCHAR(45) NOT NULL,
  `recipe_id_2` VARCHAR(45) NOT NULL,
  `recipe_id_3` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `foodmania`.`users` (`user_id`));

CREATE TABLE `foodmania`.`favoriterecipes` (
  `user_id` INT NOT NULL,
  `recipe_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`recipe_id`, `user_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id_f`
    FOREIGN KEY (`user_id`)
    REFERENCES `foodmania`.`users` (`user_id`));

CREATE TABLE `foodmania`.`recipes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `image` LONGTEXT NOT NULL,
  `readyInMinutes` INT NOT NULL,
  `popularity` INT NOT NULL,
  `vegan` BOOLEAN NOT NULL,
  `vegetarian` BOOLEAN NOT NULL,
  `glutenFree` BOOLEAN NOT NULL,
  `instructions` LONGTEXT NOT NULL,
  `ingredients` NVARCHAR(4000) NOT NULL,
  `servings` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `foodmania`.`familyrecipes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `image` LONGTEXT NOT NULL,
  `readyInMinutes` INT NOT NULL,
  `vegan` BOOLEAN NOT NULL,
  `vegetarian` BOOLEAN NOT NULL,
  `glutenFree` BOOLEAN NOT NULL,
  `belongsTo` VARCHAR(100) NOT NULL,
  `whenToMake` LONGTEXT NOT NULL,
  `instructions` LONGTEXT NOT NULL,
  `ingredients` NVARCHAR(4000) NOT NULL,
  `servings` INT NOT NULL,
  PRIMARY KEY (`id`));


-- CREATE TABLE `foodmania`.`ingredient` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`id`, `name`));

-- CREATE TABLE `foodmania`.`measure` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`id`, `name`));

-- DROP TABLE IF EXISTS `foodmania`.`recipe_ingredient`
-- GO
-- CREATE TABLE `foodmania`.`recipe_ingredient` (
--   `recipe_id` INT NOT NULL,
--   `ingredient_id` INT NOT NULL,
--   `measure_id` INT NOT NULL,
--   `amount` FLOAT NOT NULL,
--   INDEX `fk_recipe_idx` (`recipe_id` ASC) VISIBLE,
--   INDEX `fk_ingredient_idx` (`ingredient_id` ASC) VISIBLE,
--   INDEX `fk_measure_idx` (`measure_id` ASC) VISIBLE,
--   CONSTRAINT `fk_recipe`
--     FOREIGN KEY (`recipe_id`)
--     REFERENCES `foodmania`.`recipes` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `fk_ingredient`
--     FOREIGN KEY (`ingredient_id`)
--     REFERENCES `foodmania`.`ingredient` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `fk_measure`
--     FOREIGN KEY (`measure_id`)
--     REFERENCES `foodmania`.`measure` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION);

-- DROP TABLE IF EXISTS `foodmania`.`usersrecipes`
-- GO
-- CREATE TABLE `foodmania`.`usersrecipes` (
--   `user_id` INT NOT NULL,
--   `recipe_id` INT NOT NULL,
--   `isfamily` BOOLEAN NOT NULL,
--   INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
--   INDEX `fk_recipe_idx` (`recipe_id` ASC) VISIBLE,
--   CONSTRAINT `fk_user_id`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `foodmania`.`users` (`user_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `fk_recipe_id`
--     FOREIGN KEY (`recipe_id`)
--     REFERENCES `foodmania`.`recipes` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION);



-- INSERT INTO foodmania.measure (name) VALUES('CUP'), ('TEASPOON'), ('TABLESPOON'), ('PINCH'), ('gm'), ('ml');

-- INSERT INTO foodmania.ingredient (name) VALUES('egg'), ('salt'), ('sugar'), ('chocolate'), ('vanilla extract'), ('flour');
