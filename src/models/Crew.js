import mongoose from "mongoose";

const { Schema } = mongoose;

const CrewSchema = new Schema({
  crew_name: { type: String, required: true },
  crew_token: { type: String, required: true },
});

let Crew;
try {
  Crew = mongoose.model("Crew");
} catch (e) {
  Crew = mongoose.model("Crew", CrewSchema);
}

export default Crew;
