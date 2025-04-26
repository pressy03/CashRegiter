DROP DATABASE IF EXISTS cash_registers;

CREATE DATABASE IF NOT EXISTS cash_registers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cash_registers;

CREATE TABLE IF NOT EXISTS users(
 id INT AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(50) UNIQUE NOT NULL,
 password VARCHAR(255) NOT NULL,
 role ENUM('admin','user') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS products(
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(255) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 rating TINYINT NOT NULL,
 description TEXT,
 image_url VARCHAR(255),
 brand ENUM('Daisy','Tremol','Datecs','Eltrade'),
 size ENUM('малък','голям'),
 function_type ENUM('Преносим','Стационарен'),
 category ENUM('device','consumable') NOT NULL DEFAULT 'device'
);

CREATE TABLE IF NOT EXISTS messages(
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 content TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS service_requests(
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 description TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS orders(
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 payment_method ENUM('cod','iban','crypto'),
 total DECIMAL(10,2),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items(
 id INT AUTO_INCREMENT PRIMARY KEY,
 order_id INT,
 product_id INT,
 quantity INT,
 price_each DECIMAL(10,2),
 FOREIGN KEY (order_id) REFERENCES orders(id),
 FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT IGNORE INTO users (id,username,password,role) VALUES
 (1,'admin', '$2y$10$Pc0K7CYy1MzLDwHmKRe19.Zyuc8E6HKsBjuQS5Vz7g7a8pR1D0oMq', 'admin');
