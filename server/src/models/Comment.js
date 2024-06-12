import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
        text:{
            type:String,
            isRequired:true
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        post:{
            type:Schema.Types.ObjectId,
            ref:"Post"
        }
})

export default mongoose.model("Comment",CommentSchema)