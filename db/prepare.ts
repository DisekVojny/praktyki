import pgPromise from "pg-promise"
const pg = pgPromise();

// recreate db

const server = pg({
    host: "db",
    port: 5433,
    database: "postgres",
    user: "admin",
    password: "admin123"
})

await server.none("DROP DATABASE IF EXISTS habitify")
await server.none("CREATE DATABASE habitify")


import db from "./db";

// USERS (id, username varchar255, password hash char64)
// yo_habits (id, user_id fk, name, days BINARY(7), notes TEXT, start DATE)
// mes_habits (id, user_id fk, name, unit VARCHAR(24), target INT, days BINARY(7), notes, start DATE)
// yo_done (id, habit_id, date)
// mes_done (id, habit_id, date, target INT)

await db.none("DROP TABLE IF EXISTS users")
await db.none("DROP TABLE IF EXISTS yo_habits")
await db.none("DROP TABLE IF EXISTS mes_habits")
await db.none("DROP TABLE IF EXISTS yo_done")
await db.none("DROP TABLE IF EXISTS mes_done")

await db.none(`
    CREATE TABLE users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(64)
    )
`);

await db.none(`
    CREATE TABLE yo_habits (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
        name TEXT,
        days bit(7),
        notes TEXT,
        start DATE
    )
`);

await db.none(`
    CREATE TABLE mes_habits (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
        name TEXT,
        target INTEGER,
        unit VARCHAR(24),
        days bit(7),
        notes TEXT,
        start DATE
    )
`);

await db.none(`
    CREATE TABLE yo_done (
        id VARCHAR(36) PRIMARY KEY,
        habit_id VARCHAR(36) REFERENCES yo_habits(id) ON DELETE SET NULL,
        start DATE
    )
`);

await db.none(`
    CREATE TABLE mes_done (
        id VARCHAR(36) PRIMARY KEY,
        habit_id VARCHAR(36) REFERENCES mes_habits(id) ON DELETE SET NULL,
        target INT,
        start DATE
    )
`);

await db.none(`
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
    CREATE INDEX idx_yo_done_start ON yo_done (start);

    -- Mes Done Table Indexes
    CREATE INDEX idx_mes_done_habit_id ON mes_done (habit_id);
    CREATE INDEX idx_mes_done_start ON mes_done (start);
    CREATE INDEX idx_mes_done_target ON mes_done (target);
`);


console.log(1);

// console.log(await db.one("SELECT gen_random_VARCHAR(36)()"))