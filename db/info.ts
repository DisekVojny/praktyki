import db from "./db";
import bcrypt from "bcrypt";
import { v4 } from "uuid";



// const password = "test"
// const hash = await bcrypt.hash(password,bcrypt.genSaltSync(10))
// console.log(bcrypt.compareSync(password, hash))


// console.log(await db.manyOrNone("select * from users where id = '2137'"))
// console.log(await db.manyOrNone("select * from mes_habits"))
// console.log(await db.oneOrNone("select * from users where username = '1'"))
// const uuid = v4()
// console.log((await db.one("SELECT $1 as id", [uuid]))['id'] == uuid)
// console.log(uuid)

// console.log(await db.one("SELECT $letter", {
//     "letter": "1"
// }))

// console.log(await db.many("SELECT * FROM users"));
// console.log(await db.many("SELECT * FROM mes_done"));
// console.log(await db.manyOrNone("SELECT 1 FROM mes_done WHERE start = CURRENT_DATE", ["1328e278-e288-4cbd-a1cd-f1c0fb71a303"]))
// console.log(await db.manyOrNone("SELECT start::TEXT, CURRENT_TIME FROM mes_done", ["1328e278-e288-4cbd-a1cd-f1c0fb71a303"]))
// console.log(await db.many("SELECT CURRENT_DATE  = (SELECT CURRENT_DATE)::DATE"));

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


console.log(1)
