import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
    }
    catch(error){
        console.log(`Error in MongoDB is ${error}`);
    }
}

export default connectDB