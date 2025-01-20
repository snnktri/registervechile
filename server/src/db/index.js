import mongoose from "mongoose";
import { dbName } from "../constant.js";


const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.Db_URL}/${dbName}`
        );
        console.log(`Mongodb Connected!! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to databse: "+error);
        process.exit(1);
    }
}

export default connectDb;