CREATE TABLE `foodmania`.`users` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

CREATE TABLE `foodmania`.`users_watched_recipes` (
  `username` VARCHAR(16) NOT NULL,
  `recipeId1` VARCHAR(45) NOT NULL,
  `recipeId2` VARCHAR(45) NOT NULL,
  `recipeId3` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `username`
    FOREIGN KEY (`username`)
    REFERENCES `foodmania`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `foodmania`.`users_favorites` (
  `username` VARCHAR(16) NOT NULL,
  `recipeId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`recipeId`, `username`),
  INDEX `username_idx` (`username` ASC) VISIBLE,
  CONSTRAINT `username_f`
    FOREIGN KEY (`username`)
    REFERENCES `foodmania`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `foodmania`.`ingredient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `name`));

CREATE TABLE `foodmania`.`measure` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `name`));

CREATE TABLE `foodmania`.`recipes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `image` LONGTEXT NOT NULL,
  `readyInMinutes` INT NOT NULL,
  `popularity` INT NOT NULL,
  `vegan` BOOLEAN NOT NULL,
  `vegetarian` BOOLEAN NOT NULL,
  `glutenFree` BOOLEAN NOT NULL,
  `instructions` LONGTEXT NOT NULL,
  `servings` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `foodmania`.`recipe_ingredient` (
  `recipe_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `measure_id` INT NOT NULL,
  `amount` FLOAT NOT NULL,
  INDEX `fk_recipe_idx` (`recipe_id` ASC) VISIBLE,
  INDEX `fk_ingredient_idx` (`ingredient_id` ASC) VISIBLE,
  INDEX `fk_measure_idx` (`measure_id` ASC) VISIBLE,
  CONSTRAINT `fk_recipe`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `foodmania`.`recipes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingredient`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `foodmania`.`ingredient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_measure`
    FOREIGN KEY (`measure_id`)
    REFERENCES `foodmania`.`measure` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `foodmania`.`users_recipes` (
  `username` VARCHAR(45) NOT NULL,
  `recipeid` INT NOT NULL,
  `isfamily` BOOLEAN NOT NULL,
  INDEX `fk_username_idx` (`username` ASC) VISIBLE,
  INDEX `fk_recipe_idx` (`recipeid` ASC) VISIBLE,
  CONSTRAINT `fk_username`
    FOREIGN KEY (`username`)
    REFERENCES `foodmania`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recipeid`
    FOREIGN KEY (`recipeid`)
    REFERENCES `foodmania`.`recipes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO foodmania.measure (name) VALUES('CUP'), ('TEASPOON'), ('TABLESPOON'), ('PINCH'), ('gm'), ('ml');

INSERT INTO foodmania.ingredient (name) VALUES('egg'), ('salt'), ('sugar'), ('chocolate'), ('vanilla extract'), ('flour');
