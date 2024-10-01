import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path:"../../.env"})
import { DB_NAME } from '../constants.js';

const connectDB = async ()=>{
    try {
        const connnectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Databse connected !!!: ${connnectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Error connecting database: ${error}`);
        process.exit(1)
    }
}
export { connectDB }