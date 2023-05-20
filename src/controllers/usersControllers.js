import { db } from "../db/database.js"

export async function getMe(req, res) {
    try {
        const sessionId = res.locals.sessao.rows[0].id

        const result = await db.query(`select urls.*,urls.id as "idDaUrl",users.name,users.id as "idDoUsuario",sessions.id from urls join sessions on urls."sessionId"=sessions.id join users on sessions."userId"=users.id where sessions.id=$1;`, [sessionId])
        const sum = await db.query(`select sum("visitCount") as soma from urls where "sessionId"=$1;`, [sessionId])
        const obj = {
            id: result.rows[0].idDoUsuario,
            name: result.rows[0].name,
            visitCount: Number(sum.rows[0].soma),
            shortenedUrls: result.rows.map(i => ({
                id: i.idDaUrl,
                shortUrl: i.shortUrl,
                url: i.url,
                visitCount: i.visitCount
            }))
        }
        res.status(200).send(obj)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function ranking(req, res) {
    try {
        const result = await db.query(`select users.id,users.name,count(urls.url) as "linksCount",sum(urls."visitCount") as "visitCount" from urls join sessions on sessions.id=urls."sessionId" join users on users.id=sessions."userId"
        group by users.id,users.name order by "visitCount";`)
        console.log(result.rows)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}