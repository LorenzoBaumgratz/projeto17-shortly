import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { db } from "../db/database.js"

export async function signIn(req, res) {
    const {email,password}=req.body

    try {
        const usuario = await db.query(`select * from users where email=$1;`,[email])
        if (usuario.rowCount===0) return res.status(401).send("email e/ou senha incorretos")

        const senhaCorreta = bcrypt.compareSync(password, usuario.rows[0].password)
        if (!senhaCorreta) return res.status(401).send("email e/ou senha incorretos")

        const token = uuid()
        await db.query(`insert into sessions ("userId",token) values($1,$2);`,[usuario.rows[0].id,token])
        res.status(200).send({token})
    } catch (err) {
        res.status(500).send(err.message)
    }


}

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.sendStatus(422)

    const hash=bcrypt.hashSync(password,10)

    try {
        const usuario = await db.query(`select * from users where email=$1;`, [email])
        if (usuario.rowCount !== 0) return res.sendStatus(409)

        await db.query(`insert into users (name,email,password) values($1,$2,$3);`,[name,email,hash])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}