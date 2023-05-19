import { db } from "../db/database.js"

export async function getMe(req,res){
    try{
        const sessionId=res.locals.sessao.rows[0].id

        const result=await db.query(`select urls.*,urls.id as "idDaUrl",users.name,users.id as "idDoUsuario",sessions.id from urls join sessions on urls."sessionId"=sessions.id join users on sessions."userId"=users.id where sessions.id=$1;`,[sessionId])
        console.log(result.rows)

        res.sendStatus(200)
    }catch(err){
        res.status(500).send(err.message)
    }
}