import dotenv from 'dotenv';
dotenv.config({path:"../.env"})
import { connectDB } from './db/index.js';
import mongoose from 'mongoose';
import { app } from './app.js'

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error(`Error : ${error}`);
        throw error;
    })

    app.listen(process.env.PORT,()=>{
        console.log(`Server running at port: ${process.env.PORT}`);
        console.log(`And You can View your webservice at http://localhost:${process.env.PORT}/`);
    })
})
.catch((error)=>{
    console.log(`MONGODB CONNECTION FAILED !:\n ${error}`);
});
