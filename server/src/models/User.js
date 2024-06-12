import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    profile_photo: String,
    posts:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }],
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }]
})


export default mongoose.model("User",UserSchema)