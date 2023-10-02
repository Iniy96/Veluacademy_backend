// get the client
import mysql from 'mysql2';
import dotenv from "dotenv";

dotenv.config()

// create the connection to database
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "velu_academy",
  }).promise()

//  export const pool2 = mysql.createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "root",
//     database: "world",
//   }).promise()

export default pool;