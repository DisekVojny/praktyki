-- Recreate the database
DROP DATABASE IF EXISTS habitify;
CREATE DATABASE habitify;

-- Connect to the new database
\c habitify;

-- Drop existing tables
DROP TABLE IF EXISTS yo_done;
DROP TABLE IF EXISTS mes_done;
DROP TABLE IF EXISTS yo_habits;
DROP TABLE IF EXISTS mes_habits;
DROP TABLE IF EXISTS users;

-- Create the `users` table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(64)
);

-- Create the `yo_habits` table
CREATE TABLE yo_habits (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    name TEXT,
    days BIT(7),
    notes TEXT,
    start DATE
);

-- Create the `mes_habits` table
CREATE TABLE mes_habits (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    name TEXT,
    target INTEGER,
    unit VARCHAR(24),
    days BIT(7),
    notes TEXT,
    start DATE
);

-- Create the `yo_done` table
CREATE TABLE yo_done (
    id VARCHAR(36) PRIMARY KEY,
    habit_id VARCHAR(36) REFERENCES yo_habits(id) ON DELETE SET NULL,
    start DATE
);

-- Create the `mes_done` table
CREATE TABLE mes_done (
    id VARCHAR(36) PRIMARY KEY,
    habit_id VARCHAR(36) REFERENCES mes_habits(id) ON DELETE SET NULL,
    target INT,
    start DATE
);

-- Add indexes
-- Users Table Index
CREATE UNIQUE INDEX idx_users_username ON users (username);

-- Yo Habits Table Indexes
CREATE INDEX idx_yo_habits_user_id ON yo_habits (user_id);
CREATE INDEX idx_yo_habits_start ON yo_habits (start);

-- Mes Habits Table Indexes
CREATE INDEX idx_mes_habits_user_id ON mes_habits (user_id);
CREATE INDEX idx_mes_habits_start ON mes_habits (start);
CREATE INDEX idx_mes_habits_target_unit ON mes_habits (target, unit);

-- Yo Done Table Indexes
CREATE INDEX idx_yo_done_habit_id ON yo_done (habit_id);
CREATE INDEX idx_yo_done_start ON yo_done (start);docker tutorial

-- Mes Done Table Indexes
CREATE INDEX idx_mes_done_habit_id ON mes_done (habit_id);
CREATE INDEX idx_mes_done_start ON mes_done (start);
CREATE INDEX idx_mes_done_target ON mes_done (target);

-- Output success message
-- DO $$ BEGIN RAISE NOTICE 'Database setup completed successfully.'; END $$;
