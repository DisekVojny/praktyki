import pgPromise from "pg-promise"
const pg = pgPromise();

const db = pg({
    host: "db",
    port: 5432,
    database: "habitify",
    user: "admin",
    password: "admin123"
})

export default db