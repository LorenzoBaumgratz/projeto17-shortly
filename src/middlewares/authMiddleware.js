import { db } from "../db/database.js"


export async function authValidation(req,res,next){
    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)
    
    try{
        const sessao = await db.query(`select * from sessions where token=$1;`,[token])
        if (sessao.rowCount===0) return res.sendStatus(401) 
        res.locals.sessao=sessao
    }catch(err){
        return res.status(500).send(err.message)
    }
    
    next()
}