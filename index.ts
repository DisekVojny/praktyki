import express from "express"
import path from "path";
import db from "./db/db";
import bcrypt, { hash } from "bcrypt";
const app = express()
import cookieParser from 'cookie-parser';
import { verify, sign } from "jsonwebtoken";
import {v4} from "uuid"

app.use(cookieParser());
app.use(express.static('assets'))
app.use(express.static('dist/'))
app.use(express.json())

const returnIndex = (req: Request, res: any) => {res.sendFile(path.join(import.meta.dir, '/dist/index.html'))}


app.use((req, _, next) => {
    console.log(req.path)
    next()
})

app.get("/", returnIndex)
app.get("/create", returnIndex)
app.get("/login", returnIndex)
app.get("/register", returnIndex)
app.get("/overview/:id", returnIndex)



app.get("/logout", (req, res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect("/login")
    res.status(201).send()
})

app.get("/islogged", (req, res) => {
    const token = req.cookies.jwt;
    
    if(!token){
        res.send("")
        return;
    }


    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.send(""); return}
        
        const username: any = await db.oneOrNone("select username from users where id = $1", [dec])
    

        if(!username || !username.username){
            res.send("")
            return;
        }

        res.send(username.username)

    })

})



app.post("/register", async (req, res) => {
    const {username, password} = req.body
    if(!/^[^\s]{4,20}$/.test(username) || !/^[^\s]{7,20}$/.test(password)) {res.status(401).send("wrong data provided"); return}
    
    const check = await db.oneOrNone("SELECT username FROM users WHERE username = $1", [username])
    if(check) {res.status(401).send("Username is unavailable"); return}

    try {
        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10))
        const uuid = v4()

        await db.none("INSERT INTO USERS VALUES ($1, $2, $3)", [uuid,username, hashedPassword])
        
        const token = sign(uuid, "habitify")
        console.log(`new user: ${username}`);
        res.cookie("jwt", token, {httpOnly: true})

        res.status(200).send("Pomyślnie utworzono konto")

    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}) 

app.post("/login", async (req, res) => {
    const {username, password} = req.body
    if(!/^[^\s]{4,20}$/.test(username) || !/^[^\s]{7,20}$/.test(password)) {res.status(401).send("wrong data provided"); return}

    const res_db = await db.oneOrNone("SELECT * FROM users where username = $1", [username])
    if (res_db === null) {res.status(401).send("Błędny login lub hasło"); return}
    const auth = bcrypt.compareSync(password, res_db['password'])
    if(!auth) {res.status(401).send("Błędny login lub hasło"); return}
    
    const token = sign(res_db['id'], "habitify")
    res.cookie("jwt", token, {httpOnly: true})
    res.status(200).send("Login successful");
    return

}) 

app.post("/create/yo_habit", (req, res) => {
    const {name, every, notes} = req.body;
    console.log(name, every, notes)

    const token = req.cookies.jwt;

    if(!token){
        res.status(201).send("")
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}
        const check = await db.manyOrNone("SELECT * from yo_habits where user_id = $1 AND name = $2", [dec, name])
        if(check.length) {
            res.status(401).send(`already have yes/no habit named ${name}`)
            return
        }
        await db.none("INSERT INTO yo_habits VALUES($1, $2, $3, $4, $5, CURRENT_DATE)", [v4(), dec, name, every, notes])
        res.status(201).send()
    })
})

app.post("/create/mes_habit", (req, res) => {
    const {name, target, unit, every, notes} = req.body;

    if(!(/^(0|[1-9][0-9]*)$/.test(target))){
        res.status(401).send(`Target should be a number`)
        return
    }

    if(target < 1 || target > 2147483646) {
        res.status(401).send(`Bet you cannot do that much`)
        return
    }

    if(unit.length > 24) {
        res.status(401).send(`Isn't that unit too long?`)
        return
        
    }
    console.log(name, target, unit, every, notes)

    const token = req.cookies.jwt;

    if(!token){
        res.status(201).send("")
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}
        const check = await db.manyOrNone("SELECT * from mes_habits where user_id = $1 AND name = $2", [dec, name])
        if(check.length) {
            res.status(401).send(`already have measurable habit named ${name}`)
            return
        }
        console.log(1);
        
        await db.none("INSERT INTO mes_habits VALUES($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE)", [v4(), dec, name, target, unit, every, notes])
        res.status(201).send()
    })
})



app.get("/api/habits", (req, res) => {
    const token = req.cookies.jwt;

    if(!token){
        res.status(201).send("")
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}

        // const yo = await db.manyOrNone("SELECT name, days FROM yo_habits WHERE user_id = $1", [dec])
        // const mes = await db.manyOrNone("SELECT name, target, unit, days FROM mes_habits WHERE user_id = $1", [dec])
        
        // const yo = await db.manyOrNone(`SELECT yh.id, yh.name, yh.days, EXISTS (SELECT 1 FROM yo_done yd WHERE yd.habit_id = yh.id AND yd.start = CURRENT_DATE) AS "completedToday" FROM yo_habits yh WHERE yh.user_id = $1`, [dec]);

        // const mes = await db.manyOrNone(`SELECT mh.id, mh.name, mh.target, mh.unit, mh.days, EXISTS (SELECT 1 FROM mes_done md WHERE md.habit_id = mh.id AND md.start = CURRENT_DATE) AS "completedToday" FROM mes_habits mh WHERE mh.user_id = $1`, [dec]);


        const yo = await db.manyOrNone(`
            SELECT yh.id, yh.name, yh.days, 
                EXISTS (
                    SELECT 1 
                    FROM yo_done yd 
                    WHERE yd.habit_id = yh.id 
                      AND yd.start = CURRENT_DATE
                ) AS "completedToday"
            FROM yo_habits yh
            WHERE yh.user_id = $1
              AND SUBSTRING(yh.days, ((EXTRACT(DOW FROM CURRENT_DATE)::INT + 6) % 7) + 1, 1) = '1'
        `, [dec]);
        
        const mes = await db.manyOrNone(`
            SELECT mh.id, mh.name, mh.target, mh.unit, mh.days, (SELECT target FROM mes_done md WHERE md.habit_id = mh.id AND md.start = CURRENT_DATE) AS "completedToday"
            FROM mes_habits mh
            WHERE mh.user_id = $1
              AND SUBSTRING(mh.days, ((EXTRACT(DOW FROM CURRENT_DATE)::INT + 6) % 7) + 1, 1) = '1'
        `, [dec]);
        

        const dis_yo = await db.manyOrNone(`
            SELECT yh.id, yh.name, yh.days, 
                EXISTS (
                    SELECT 1 
                    FROM yo_done yd 
                    WHERE yd.habit_id = yh.id 
                      AND yd.start::DATE = CURRENT_DATE
                ) AS "completedToday"
            FROM yo_habits yh
            WHERE yh.user_id = $1
              AND SUBSTRING(yh.days, ((EXTRACT(DOW FROM CURRENT_DATE)::INT + 6) % 7) + 1, 1) != '1'
        `, [dec]);

        const dis_mes = await db.manyOrNone(`
            SELECT mh.id, mh.name, mh.target, mh.unit, mh.days, (SELECT target FROM mes_done md WHERE md.habit_id = mh.id AND md.start = CURRENT_DATE) AS "completedToday"
            FROM mes_habits mh
            WHERE mh.user_id = $1
              AND SUBSTRING(mh.days, ((EXTRACT(DOW FROM CURRENT_DATE)::INT + 6) % 7) + 1, 1) != '1'
        `, [dec]);

        res.status(201).json([yo, mes, dis_yo.concat(dis_mes)])
    })

})

app.post("/api/yo_done", (req, res) => {
    const {id} = req.body;

    const token = req.cookies.jwt;

    if(!token){
        res.status(201).send("")
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}
        const check = await db.manyOrNone("SELECT 1 FROM yo_done WHERE habit_id = $1 AND start = CURRENT_DATE", [id])
        if(check.length){
            res.status(401).send()
            return;
        }
        db.none("INSERT INTO yo_done VALUES($1, $2, CURRENT_DATE)", [v4(), id])
        res.status(201).send()
    })
})


app.post("/api/mes_done", (req, res) => {
    const {id, target} = req.body;

    const token = req.cookies.jwt;

    if(!token){
        res.status(201).send("")
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}

        const check = await db.manyOrNone("SELECT 1 FROM mes_done WHERE habit_id = $1 AND start = CURRENT_DATE", [id])

        if(check.length === 0){
            db.none("INSERT INTO mes_done VALUES($1, $2, $3, CURRENT_DATE)", [v4(), id, target])
            res.status(201).send()
            return;
        }
        db.none("UPDATE mes_done SET target = $1 WHERE habit_id = $2", [target, id]);
        res.status(201).send()
    })
})

app.get("/details/:id", async (req, res) => {
    const id = req.params.id;
    const token = req.cookies.jwt;

    if(!token){
        res.status(401).json([])
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}


        const yo = await db.oneOrNone("SELECT * from yo_habits WHERE id = $1", [id])
        if(yo){
            if(yo.user_id !== dec){
                res.status(401).send("That's not your habit!!!")
                return;    
            }
            const done = await db.manyOrNone("SELECT start FROM yo_done WHERE habit_id = $1", [id])
            done.map(el => el.start)
            res.status(201).json(["yo", yo, done])
            return;
        }
    
        const mes = await db.oneOrNone("SELECT * from mes_habits WHERE id = $1", [id])
        if(mes){
            if(mes.user_id !== dec){
                res.status(401).send("That's not your habit!!!")
                return;    
            }

            const done = await db.manyOrNone("SELECT start, target FROM mes_done WHERE habit_id = $1", [id])
            res.status(201).json(["mes", mes, done])
            return;
        }
    
        console.log("No habit with this ID was found")

    })
})

app.delete("/delete/yo", (req, res) => {
    const {id} = req.body

    const token = req.cookies.jwt;

    if(!token){
        res.status(201).send("")
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}

        db.none("DELETE FROM yo_habits WHERE id = $1 AND user_id = $2", [id, dec]);
        res.status(201).send()
    })
})

app.delete("/delete/mes", (req, res) => {
    const {id} = req.body

    const token = req.cookies.jwt;

    if(!token){
        res.status(201).send("")
        return;
    }

    verify(token, "habitify", async (err: any, dec: any) => {
        if(err) {res.status(500).send("error occured"); return}

        db.none("DELETE FROM mes_habits WHERE id = $1 AND user_id = $2", [id, dec]);
        res.status(201).send()
    })
})


const port = process.env.PORT || 8080

app.listen(8080, () => {
    console.log(`listening at http://localhost:${port}`)
})
