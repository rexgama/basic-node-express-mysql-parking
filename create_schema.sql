DROP DATABASE IF EXISTS parking;

CREATE DATABASE parking;


-- CREATE TABLE `parking`.`vehicle_types` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `code` VARCHAR(45) NULL,
--   `name` VARCHAR(45) NULL,
--   PRIMARY KEY (`id`)
-- );
 

-- CREATE TABLE `parking`.`parking_slot_types` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `code` VARCHAR(45) NULL,
--   `name` VARCHAR(45) NULL,
--   `price_per_hour` DECIMAL(20,2) NULL DEFAULT 0,
--   PRIMARY KEY (`id`)
-- );


CREATE TABLE `parking`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `plate_number` VARCHAR(45) NULL,
  `entrance` VARCHAR(45) NULL,
  `exit` VARCHAR(45) NULL,
  `vehicle_type` VARCHAR(45) NULL,
  `parking_type` VARCHAR(45) NULL,
  `distances` VARCHAR(45) NULL,
  `total_hours` INT NULL DEFAULT 0,
  `total_price` DECIMAL(20,2) NULL DEFAULT 0,
  `status` VARCHAR(45) DEFAULT "UNPAID",
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


