
import jwt from 'jsonwebtoken';
import { verifyUser } from '../../../middlewares/auth.js';

const JWT_SECRET = process.env.JWT_SECRET


export const tokenValidation = async(req,res)=>{
    try {
        // access authorize header to validate request
        const email = req?.headers?.email
        const token = req?.headers?.authorization.split(" ")[1];
        const isEmailInDB = await verifyUser(email)
        
        if (!isEmailInDB) return res.status(202).json({msg:"Email id not found."})
        
        const decode=jwt.verify(token, JWT_SECRET)
        
        // create new jwt token
        const Newtoken = jwt.sign({
            email
        }, JWT_SECRET, { expiresIn: "10min" });

        res.status(200).json({
        msg: "Login Successful...!",
            email,
            Newtoken
        });



    } catch (error) {
        return res.status(500).json({"toekn expired": error });
    }
}


