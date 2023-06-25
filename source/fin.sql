-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fin
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fin
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fin` DEFAULT CHARACTER SET utf8mb3 ;
USE `fin` ;

-- -----------------------------------------------------
-- Table `fin`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fin`.`user` (
  `Id` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `fin`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fin`.`customer` (
  `Ssn` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Addr_City` VARCHAR(45) NULL DEFAULT NULL,
  `Addr_Street` VARCHAR(45) NULL DEFAULT NULL,
  `Addr_State` VARCHAR(45) NULL DEFAULT NULL,
  `Cus_Id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Ssn`, `Cus_Id`),
  INDEX `fk_Customer_User1_idx` (`Cus_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Customer_User1`
    FOREIGN KEY (`Cus_Id`)
    REFERENCES `fin`.`user` (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `fin`.`salesperson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fin`.`salesperson` (
  `Sid` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Sale_Id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Sid`, `Sale_Id`),
  INDEX `fk_Salesperson_User1_idx` (`Sale_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Salesperson_User1`
    FOREIGN KEY (`Sale_Id`)
    REFERENCES `fin`.`user` (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `fin`.`car`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fin`.`car` (
  `Vin` INT NOT NULL,
  `Price` INT NOT NULL,
  `Model` VARCHAR(20) NOT NULL,
  `Engine_size` INT NOT NULL,
  `Sale_date` VARCHAR(45) NULL DEFAULT NULL,
  `SSid` INT NULL DEFAULT NULL,
  `CSsn` INT NULL DEFAULT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_Car_Salesperson_idx` (`SSid` ASC) VISIBLE,
  INDEX `fk_Car_Customer1_idx` (`CSsn` ASC) VISIBLE,
  INDEX `carmodel` USING BTREE (`Model`) VISIBLE,
  INDEX `carengine` USING BTREE (`Engine_size`) VISIBLE,
  INDEX `carprice` USING BTREE (`Price`) VISIBLE,
  CONSTRAINT `fk_Car_Customer1`
    FOREIGN KEY (`CSsn`)
    REFERENCES `fin`.`customer` (`Ssn`),
  CONSTRAINT `fk_Car_Salesperson`
    FOREIGN KEY (`SSid`)
    REFERENCES `fin`.`salesperson` (`Sid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `fin`.`suv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fin`.`suv` (
  `Vin` INT NOT NULL,
  `Price` INT NOT NULL,
  `Model` VARCHAR(45) NOT NULL,
  `No_seats` INT NOT NULL,
  `Sale_date` VARCHAR(20) NULL DEFAULT NULL,
  `SSid` INT NULL DEFAULT NULL,
  `CSsn` INT NULL DEFAULT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_Suv_Salesperson1_idx` (`SSid` ASC) VISIBLE,
  INDEX `fk_Suv_Customer1_idx` (`CSsn` ASC) VISIBLE,
  INDEX `suvmodel` USING BTREE (`Model`) VISIBLE,
  INDEX `suvseat` USING BTREE (`No_seats`) VISIBLE,
  INDEX `suvprice` USING BTREE (`Price`) VISIBLE,
  CONSTRAINT `fk_Suv_Customer1`
    FOREIGN KEY (`CSsn`)
    REFERENCES `fin`.`customer` (`Ssn`),
  CONSTRAINT `fk_Suv_Salesperson1`
    FOREIGN KEY (`SSid`)
    REFERENCES `fin`.`salesperson` (`Sid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `fin`.`truck`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fin`.`truck` (
  `Vin` INT NOT NULL,
  `Price` INT NOT NULL,
  `Model` VARCHAR(45) NOT NULL,
  `Tonnage` INT NOT NULL,
  `Sale_date` VARCHAR(20) NULL DEFAULT NULL,
  `SSid` INT NULL DEFAULT NULL,
  `CSsn` INT NULL DEFAULT NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_Truck_Salesperson1_idx` (`SSid` ASC) VISIBLE,
  INDEX `fk_Truck_Customer1_idx` (`CSsn` ASC) VISIBLE,
  INDEX `truckmodel` USING BTREE (`Model`) VISIBLE,
  INDEX `truckton` USING BTREE (`Tonnage`) VISIBLE,
  INDEX `truckprice` USING BTREE (`Price`) VISIBLE,
  CONSTRAINT `fk_Truck_Customer1`
    FOREIGN KEY (`CSsn`)
    REFERENCES `fin`.`customer` (`Ssn`),
  CONSTRAINT `fk_Truck_Salesperson1`
    FOREIGN KEY (`SSid`)
    REFERENCES `fin`.`salesperson` (`Sid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
