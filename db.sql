-- Database: inmos

-- DROP DATABASE IF EXISTS inmos;

-- CREATE DATABASE inmos;

-- COMMENT ON DATABASE inmos
--  IS 'inmos database';

-- Table: store

-- DROP TABLE IF EXISTS store CASCADE;

CREATE TABLE IF NOT EXISTS store (
  store_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  contact JSONB NOT NULL
);

-- Table: vendor

-- DROP TABLE IF EXISTS vendor CASCADE

CREATE TABLE IF NOT EXISTS vendor (
  vendor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_name TEXT NOT NULL UNIQUE,
  contact JSONB NOT NULL
);

-- Table: stock

-- DROP TABLE IF EXISTS stock CASCADE

CREATE TABLE IF NOT EXISTS stock (
  stock_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_name TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Table: inventory

DROP TABLE IF EXISTS inventory CASCADE

CREATE TABLE IF NOT EXISTS inventory (
  stock_id UUID NOT NULL REFERENCES stock ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES store ON DELETE CASCADE,
  quantity INT DEFAULT 0 CHECK (quantity >= 0),
  cost_price NUMERIC(15,2) DEFAULT 0.00 CHECK (cost_price >= 0.00),
  selling_price NUMERIC(15,2) DEFAULT 0.00 CHECK (selling_price >= 0.00),
  PRIMARY KEY (stock_id, store_id)
);

-- Table: supplies

DROP TABLE IF EXISTS supplies CASCADE

CREATE TABLE IF NOT EXISTS supplies (
  store_id UUID NOT NULL REFERENCES store ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendor ON DELETE RESTRICT,
  stock_id UUID NOT NULL REFERENCES stock ON DELETE CASCADE,
  quantity INT DEFAULT 0 CHECK (quantity >= 0),
  cost_price NUMERIC(15,2) DEFAULT 0.00 CHECK (cost_price >= 0.00),
  date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- Table: sales

DROP TABLE IF EXISTS sales CASCADE

CREATE TABLE IF NOT EXISTS sales (
  store_id UUID NOT NULL REFERENCES store ON DELETE CASCADE,
  stock_id UUID NOT NULL REFERENCES stock ON DELETE CASCADE,
  quantity INT DEFAULT 0 CHECK (quantity >= 0),
  selling_price NUMERIC(15,2) DEFAULT 0.00 CHECK (selling_price >= 0.00),
  date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
