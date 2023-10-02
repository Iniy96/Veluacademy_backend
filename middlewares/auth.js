import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import pool from "../db/connect.js";


const JWT_SECRET = process.env.JWT_SECRET

/** middleware to verify user */
export async function verifyUser(email) {
   
    try {

        // check the user existance
        const isEmailInDB = await pool.query(`SELECT email FROM registration
                                                         WHERE email= ? `, [email])

        return isEmailInDB[0].length > 0;

    } catch (error) {
        return error
    }
}