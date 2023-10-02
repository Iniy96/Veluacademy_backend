import express,{Router} from "express"
import { registration,login,resetPassword,tokenvalidation } from "../../controllers/AdminControllers/adminAuthController.js";
import { fileupload } from "../../controllers/AdminControllers/fileuploadController.js";
import configureMulter from "../../middlewares/multer.js";
import multer from "multer";
import { getQuestionTableData } from "../../controllers/AdminControllers/adminTestController.js";


const adminrouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// const upload=configureMulter()

adminrouter.get("/getQuestionTableData",getQuestionTableData)

adminrouter.post("/registration",registration)
adminrouter.post("/login",login)
adminrouter.post("/resetPassword",resetPassword)
adminrouter.post("/tokenvalidation",tokenvalidation)

//test
adminrouter.post("/fileupload",upload.single('file'),fileupload)





export default adminrouter;

