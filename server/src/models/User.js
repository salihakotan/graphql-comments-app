import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    profile_photo: String
})


export default mongoose.model("User",UserSchema)