import mongoose from "mongoose";

const { Schema } = mongoose;

const CrewSchema = new Schema({
  crew_name: { type: String, required: true },
  crew_token: { type: String, required: true },
  crew_banner: {
    name: { type: String },
    base64: { type: String },
  },
});

let Crew;
try {
  Crew = mongoose.model("Crew");
} catch (e) {
  Crew = mongoose.model("Crew", CrewSchema);
}

export default Crew;
