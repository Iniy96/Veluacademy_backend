import pool from "../../../db/connect.js";
import bcrypt from 'bcrypt';


export const registration = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body

    try {
        // check email is already registered in db
        const isEmailInDB = await pool.query(`SELECT email FROM registration
                                                WHERE email= ? `, [email])
        if (isEmailInDB[0].length > 0) return res.status(202).json({ msg: "Email already Registered" })

        // encrypting password
        const hashedPassword = await bcrypt.hash(password, 10)

        // save data into db
        const [result] = await pool.query(`
    INSERT INTO registration (first_name, last_name, email, contact, password)
    VALUES (?, ?, ?, ?, ?)
`, [firstName, lastName ? lastName : null, email, phoneNumber ? phoneNumber : null, hashedPassword]);
        const id = result.insertId
        res.json({ msg: "successfully added ", id })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
