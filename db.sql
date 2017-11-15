-- Database: inmos

-- DROP DATABASE IF EXISTS inmos;

CREATE DATABASE inmos;

COMMENT ON DATABASE inmos
  IS 'inmos database';

-- Table: stores_table

-- DROP TABLE IF EXISTS stores_table CASCADE;

CREATE TABLE IF NOT EXISTS stores_table
(
  store_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact JSONB
);

-- Table: vendors_table

-- DROP TABLE IF EXISTS vendors_table CASCADE

CREATE TABLE IF NOT EXISTS vendors_table
(
  vendor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact JSONB
);

-- Table: inventory_table

-- DROP TABLE IF EXISTS inventory_table CASCADE

CREATE TABLE IF NOT EXISTS inventory_table
(
  stock_id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

-- Table: batch_table

-- DROP TABLE IF EXISTS batch_table CASCADE

CREATE TABLE IF NOT EXISTS batch_table
(
  batch_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_time TIMESTAMP
);

-- Table: sales_table

-- DROP TABLE IF EXISTS sales_table CASCADE

CREATE TABLE IF NOT EXISTS sales_table
(
  sales_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_time TIMESTAMP
);