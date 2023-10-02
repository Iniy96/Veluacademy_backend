import pool from "../../db/connect.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendPasswordResetMail } from "../../middlewares/mailer.js";
import { verifyUser } from "../../middlewares/auth.js";
import { adminTokenValidation, isadminEmailINDB } from "../../middlewares/adminauth.js";

const JWT_SECRET = process.env.JWT_SECRET
const REGISTRATION_PASSWD = process.env.ADMIN_AUTH_PASSWORD



export const registration = async (req, res) => {
    const {adminName, adminEmail, adminPassword, registrationPassword } = req.body
    try {
        if (registrationPassword != REGISTRATION_PASSWD) return res.status(202).json({ msg: "Registration Password Not Matched" })

        const isAdmin = await isadminEmailINDB(adminEmail)

        if (isAdmin) return res.status(202).json({ msg: "Email already present" })

        const hashedPassword = await bcrypt.hash(adminPassword, 10) 

        // save data into db
        const [result] = await pool.query(`
                                    INSERT INTO admin ( admin_name, Email, password)
                                    VALUES (?, ?, ?)
                                `, [adminName,adminEmail,hashedPassword]);
        const id = result.insertId
        res.json({ msg: "successfully added ", id })

    } catch (error) {
        res.json(error)
    }

}

export const login = async(req,res)=>{
    const {adminEmail,adminPassword} = req.body
    try {
        // check email is already registered in db 
        const isEmailInDB = await pool.query(`SELECT * FROM admin
                                                WHERE email= ? `, [adminEmail])
        if (isEmailInDB[0].length <= 0) return res.status(202).json({ msg: "Email is not registered Please Signup." })

        //compare the encrypted password from the db 
        const comparePassword = await bcrypt.compare(adminPassword, isEmailInDB[0][0].password)

        if (comparePassword == false) return res.status(202).json({ msg: "Password doesn't match." })

        // create jwt token
        const token = jwt.sign({
            adminEmail
        }, JWT_SECRET, { expiresIn: "10m" });
       
        res.json({
            adminEmail,
            msg: "Login Successful...!",
            token
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const resetPassword = async(req,res)=>{
    const {adminEmail,adminPassword,registrationPassword } =req.body
    try {
        if (registrationPassword != REGISTRATION_PASSWD) return res.status(202).json({ msg: "Registration Password Not Matched" })

        const isAdmin = await isadminEmailINDB(adminEmail)

        if (!isAdmin) return res.status(202).json({ msg: "Email Not registered as admin" })

        const hashedPassword = await bcrypt.hash(adminPassword, 10) 

        const updatedPassword = await pool.query(`UPDATE admin
       SET password= ? WHERE email = ? `, [hashedPassword, adminEmail])

        // const id = result.insertId
        res.json({msg:"successfully Updated",updatedPassword})

    } catch (error) {
        res.json(error)
    }
 }


export const tokenvalidation =async(req,res)=>{
    try {
        const{adminemail,authorization} = req.headers
        const IsVadlidAdmin =await adminTokenValidation(adminemail,authorization)
       
        if (!IsVadlidAdmin) return res.status(202).json({msg:"Failure"})

        // create jwt token
        const Newtoken = jwt.sign({
            adminemail
        }, JWT_SECRET, { expiresIn: "10m" });

        res.json({
            adminemail,
            msg: "Login Successful...!",
            Newtoken
        });

        
    } catch (error) {
        res.status(500).json(error)
    }
   
}