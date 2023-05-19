import { nanoid } from "nanoid"
import { db } from "../db/database.js"


export async function postShorten(req,res){
    const {url}=req.body

    try{
        const random=nanoid()
        await db.query(`insert into urls ("shortUrl",url) values($1,$2);`,[random,url])
        const result=await db.query(`select * from urls where url=$1;`,[url])

        delete result.rows[0].url
        delete result.rows[0].visitCount
        delete result.rows[0].createdAt

        res.status(201).send(result.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function getUrlById(req,res){
    const {id}=req.params

    try{
        const result=await db.query(`select * from urls where id=$1;`,[id])
        if(result.rowCount===0) return res.sendStatus(404)

        delete result.rows[0].visitCount
        delete result.rows[0].createdAt

        res.status(200).send(result.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }
}