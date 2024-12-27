-- Create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS categories_name_idx ON categories (name);
