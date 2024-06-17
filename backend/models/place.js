import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    location:{
        lat:{
            type:String,
            require:true,
        },
        lng:{
            type:String,
            require:true,
        }
    },
    creator:{
        type: mongoose.Types.ObjectId,
        require:true,
        ref:"User"
    }
})

export default mongoose.model("Place",placeSchema)