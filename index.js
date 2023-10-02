import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from "body-parser";
import dotenv from "dotenv"
import router from "./routes/UserRouters/router.js"
import adminrouter from './routes/AdminRouters/adminRouter.js';

dotenv.config()

const app = express();

// middlewares 
//app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

const PORT = process.env.PORT;

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(201).json("TNPSC academy backend server connected");
});


// api routes
app.post('/',(req,res)=>{
    console.log("req received");
})
 app.use('/auth', router)
 app.use('/admin',adminrouter)
 

// app.use("/commonroutes",commonRouter)

// start server only when we have valid connection with database server


app.listen(8080, () => {
    console.log(`Server is running on http://localhost:${8080}`)
  })
