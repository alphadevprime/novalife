CREATE DATABASE IF NOT EXISTS jeu_vie
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE jeu_vie;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS characters (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(50) NOT NULL,
  money DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0.00,
  pos_x FLOAT NOT NULL DEFAULT 0,
  pos_y FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_characters_user_id (user_id),
  CONSTRAINT fk_characters_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inventories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  character_id INT UNSIGNED NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_inventories_character_item (character_id, item_name),
  CONSTRAINT fk_inventories_character
    FOREIGN KEY (character_id) REFERENCES characters (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS businesses (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  owner_id INT UNSIGNED NOT NULL,
  business_name VARCHAR(100) NOT NULL,
  balance DECIMAL(10, 2) UNSIGNED NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id),
  KEY idx_businesses_owner_id (owner_id),
  CONSTRAINT fk_businesses_owner
    FOREIGN KEY (owner_id) REFERENCES characters (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;
