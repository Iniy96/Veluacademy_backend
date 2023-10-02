import pool from "../../../db/connect.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendPasswordResetMail } from "../../../middlewares/mailer.js";
import { verifyUser } from "../../../middlewares/auth.js";

const JWT_SECRET = process.env.JWT_SECRET


export async function generateResetLink(req, res) {
    const { email } = req.body;
    try {
        // check email is already registered in db 
        const isEmailInDB = await pool.query(`SELECT * FROM registration
                                                WHERE email= ? `, [email])

        if (isEmailInDB[0].length <= 0) return res.status(202).json({ msg: "Email is not registered Please Signup." })

        // create jwt token
        const secret = email + JWT_SECRET
        const token = jwt.sign({ email }, secret, { expiresIn: '15m' })
        const link = `http://127.0.0.1:3000/resetPassword?email=${email}&token=${token}`

        let result = await sendPasswordResetMail(email, link)

        if (result.messageId) {
            return res.send({ msg: "You will receive an email", link, result });
        } else {
            return res.status(202).send({ error: "Email sending failed", result });
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    const { newPassword } = req.body
    const { email, token } = req.params
    const secret = email + JWT_SECRET
    try {
        jwt.verify(token, secret)

        const isuser = await verifyUser(email)

        if (!isuser) return res.status(202).json({ msg: "Email not registered" })

        // encrypting password
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        const updatedPassword = await pool.query(`UPDATE registration
       SET password= ? WHERE email = ? `, [hashedPassword, email])

        // const id = result.insertId
        res.json(updatedPassword)

    } catch (error) {
        return res.status(500).send({ error })
    }
}