import mongoose from "mongoose";

const UploadedFilesSchema = mongoose.Schema({
  email: String,
  uploads: [],
});

export default mongoose.model("user_Uploads_Data", UploadedFilesSchema);
