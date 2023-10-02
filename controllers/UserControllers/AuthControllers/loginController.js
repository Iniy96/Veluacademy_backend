
import pool from "../../../db/connect.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET


export async function login(req, res) {
    const { email, password } = req.body;
    try {
        // check email is already registered in db 
        const isEmailInDB = await pool.query(`SELECT * FROM registration
                                                WHERE email= ? `, [email])
        if (isEmailInDB[0].length <= 0) return res.status(202).json({ msg: "Email is not registered Please Signup." })

        //compare the encrypted password from the db 
        const comparePassword = await bcrypt.compare(password, isEmailInDB[0][0].password)
        if (comparePassword == false) return res.status(202).json({ msg: "Password doesn't match." })

        // create jwt token
        const token = jwt.sign({
            email
        }, JWT_SECRET, { expiresIn: "10m" });

        res.status(200).json({
            msg: "Login Successful...!",
            email,
            token
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
}
