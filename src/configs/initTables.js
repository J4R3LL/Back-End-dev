const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 15

bcrypt.hash('1234', saltRounds, (error, hash) => {
if(error){
  console.error("Error hashing password:", error)
}else{
const SQLSTATEMENT = `
DROP TABLE IF EXISTS User, Task, TaskProgress, Quest, Currency, Pets, LootPool, Inventory, Api, Bio, BattleLog, Trade, Messages;

  CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
  );
  CREATE TABLE TaskProgress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  completion_date TIMESTAMP,
  notes TEXT
  );

  CREATE TABLE Quest (
  quest_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tier INT NOT NULL
  );
  CREATE TABLE Currency (
  user_id INT PRIMARY KEY,
  pet_id INT NULL,
  coin INT,
  diamond INT
  );
  CREATE TABLE Pets (
  pet_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  hp INT NOT NULL,
  dmg INT NOT NULL,
  dmg_offset INT NOT NULL,
  cost_coin INT NOT NULL,
  cost_diamond INT NOT NULL
  );
  CREATE TABLE LootPool (
  loot_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  rarity INT NOT NULL
  );
  CREATE TABLE Inventory (
  inventory_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  loot_id INT NOT NULL
  );
  CREATE TABLE Api (
  user_id INT PRIMARY KEY,
  currency_status BOOLEAN NOT NULL,
  inventory_status BOOLEAN NOT NULL
  );
  CREATE TABLE Bio (
  user_id INT PRIMARY KEY,
  profile_pic TEXT,
  bio TEXT
  );
  CREATE TABLE BattleLog (
  battle_id INT PRIMARY KEY AUTO_INCREMENT,
  attacker_id INT NOT NULL,
  defender_id INT NOT NULL,
  status TEXT NOT NULL
  );
  CREATE TABLE Trade (
  trade_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id1 INT NOT NULL,
  user_id2 INT NOT NULL,
  coin1 INT,
  coin2 INT,
  diamond1 INT,
  diamond2 INT,
  inventory_id1 INT,
  inventory_id2 INT
  );
  CREATE TABLE Messages (
  message_id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO User (username, email, password) VALUES
  ('admin', 'adm@123', '${hash}')
  ;
  INSERT INTO Currency (user_id, coin, diamond) VALUES
  (1, 0, 0)
  ;
  INSERT INTO Bio (user_id, bio) VALUES
  (1, 'I am the admin')
  ;
  INSERT INTO Api (user_id, currency_status, inventory_status) VALUES
  (1, true, true)
  ;

  INSERT INTO LootPool (name, rarity) VALUES
  ('coin 10', 1),
  ('coin 20', 2),
  ('coin 50', 3),
  ('diamond 1', 3),
  ('diamond 2', 3),
  ('diamond 5', 4),
  ('Silver Pig', 5),
  ('John Doe', 5),
  ('Flying Cheetah', 5)
  ;

  INSERT INTO Pets (name, hp, dmg, dmg_offset, cost_coin, cost_diamond) VALUES
  ('Wolf'   , 20, 5, 2, 10, 0),
  ('Chicken', 40, 2, 0, 10, 0),
  ('Cat'    , 15, 10, 5, 10, 0),
  ('Unicorn', 100, 35, 5, 50, 1),
  ('Giraffe', 220, 20, 5, 50, 1),
  ('Crow'   , 500, 70, 10, 0, 5),
  ('Hippo'  , 1000, 200, 30, 200, 15)
  ;

  INSERT INTO Quest (title, description, tier) VALUES
  ('Log on', 'Log onto game', 1),
  ('Buy a pet', 'Buy a pet from pets', 1),
  ('Defeat 2 users', 'Beat 2 users in a battle', 2),
  ('Defeat 20 users', 'Beat 20 users in a battle', 3)
`

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});

}
  });

