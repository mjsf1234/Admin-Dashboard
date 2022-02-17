import mongoose from "mongoose";

const User = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  id: String,
  type: String,
});

export default mongoose.model("User_LoginDetails", User);
