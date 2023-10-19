import pool from "../db/connect.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const isadminEmailINDB = async (email) => {
    try {
        // check the user existance
        const isEmailInDB = await pool.query(`SELECT email FROM admin
                                                         WHERE email= ? `, [email])
        return isEmailInDB[0].length > 0;

    } catch (error) {
        return error
    }
}

export const adminTokenValidation =async(email,Authorization)=>{
    try {
        const token = Authorization.split(" ")[1];
        const decode=jwt.verify(token, JWT_SECRET)
        console.log(decode);
        if(decode.email === email) return true
        return false
    } catch (error) {
        return false
    }
}