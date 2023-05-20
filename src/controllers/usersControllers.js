import { db } from "../db/database.js"

export async function getMe(req,res){
    try{
        const sessionId=res.locals.sessao.rows[0].id

        const result=await db.query(`select urls.*,urls.id as "idDaUrl",users.name,users.id as "idDoUsuario",sessions.id from urls join sessions on urls."sessionId"=sessions.id join users on sessions."userId"=users.id where sessions.id=$1;`,[sessionId])
        const sum=await db.query(`select sum("visitCount") as soma from urls where "sessionId"=$1;`,[sessionId])
        const obj={
            id:result.rows[0].idDoUsuario,
            name:result.rows[0].name,
            visitCount:Number(sum.rows[0].soma),
            shortenedUrls:result.rows.map(i=>({
                id: i.idDaUrl,
                shortUrl:i.shortUrl,
                url:i.url,
                visitCount:i.visitCount
            }))
        }
        res.status(200).send(obj)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function ranking(req,res){
    try{
        console.log(await db.query(`select urls.*,urls.id as "idDaUrl",users.name,users.id as "idDoUsuario",sessions.id from urls left join sessions on urls."sessionId"=sessions.id left join users on sessions."userId"=users.id;`))
        res.sendStatus(200)
    }catch(err){
        res.status(500).send(err.message)
    }
}