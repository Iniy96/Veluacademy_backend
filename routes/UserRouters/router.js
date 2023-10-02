import express,{Router} from "express"
import {  generateResetLink, resetPassword } from "../../controllers/UserControllers/AuthControllers/authController.js";
import { registration } from "../../controllers/UserControllers/AuthControllers/registrationController.js";
import { login } from "../../controllers/UserControllers/AuthControllers/loginController.js";
import { tokenValidation } from "../../controllers/UserControllers/AuthControllers/authtokenvalidation.js";


const router = express.Router();

router.post("/registration",registration)
router.post("/login",login)
router.post('/generateResetLink',generateResetLink)


router.get('/tokenValidation',tokenValidation)


router.put('/resetPassword/:email/:token',resetPassword)
// router.put('/resetPassword',verifyUser, resetPassword); // use to reset password


export default router;

