import mongoose from "mongoose";

const { Schema } = mongoose;

const FileSchema = new Schema({
  crew_id: { type: String, required: true },
  file_name: { type: String, required: true },
  file_size: { type: Number, required: true },
  file_type: {
    type: String,
    required: true,
    default: "text/plain",
  },
  file_data: { type: Buffer },
  uploaded_at: { type: Date, default: Date.now },
});

let File;
try {
  File = mongoose.model("File");
} catch (e) {
  File = mongoose.model("File", FileSchema);
}

export default File;
