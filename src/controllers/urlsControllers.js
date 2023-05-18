import { nanoid } from "nanoid"
import { db } from "../db/database.js"


export async function postShorten(req,res){
    const {url}=req.body

    try{
        const random=nanoid()
        await db.query(`insert into urls ("shortUrl",url) values($1,$2);`,[random,url])
        const result=await db.query(`select * from urls where url=$1;`,[url])
        delete result.rows[0].url
        res.status(201).send(result.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }
}