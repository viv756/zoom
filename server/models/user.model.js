import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type:String,required:true
  },
  password: {
    type:String,required:true
  },
  userName: {
    type:String,required:true
  },
  token: {
    type:String
  }
})


const User = mongoose.model("User", userSchema)

export default User