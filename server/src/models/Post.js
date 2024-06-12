import mongoose, { Schema, mongo } from "mongoose";

const PostSchema = new Schema({
    title:{
        type:String,
        isRequired:true
    },
    description:String,
    short_description:String,
    cover:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }]
})

export default mongoose.model("Post",PostSchema)