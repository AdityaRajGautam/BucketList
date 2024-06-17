import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    image:{
        type:String,
        require:true
    },
    places:[{
        type: mongoose.Types.ObjectId,
        require:true,
        ref:"Place"
    }]
})

userSchema.plugin(uniqueValidator)

export default mongoose.model("User",userSchema);