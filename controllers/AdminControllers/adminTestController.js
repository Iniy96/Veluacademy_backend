
import pool from '../../db/connect.js';
import { adminTokenValidation } from '../../middlewares/adminauth.js';

export const getQuestionTableData=async(req,res)=>{
    
    try {
        const{email,authorization} = req.headers
        const IsVadlidAdmin =await adminTokenValidation(email,authorization)
        
        if (!IsVadlidAdmin) return res.status(202).json({msg:"Failure"})

        // get data from db
        const [result] = await pool.query(`SELECT * FROM questions`);
        res.json(result)
        
    } catch (error) {
        res.json({error})
    }
}