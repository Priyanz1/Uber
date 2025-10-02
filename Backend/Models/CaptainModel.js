const mongoose=require("mongoose");

const captainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    vehicle: {
      type: {
        type: String, // e.g. "car", "bike"
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      plateNumber: {
        type: String,
        required: true,
        unique: true,
      },
    },

  },
  { timestamps: true }
);

const CaptainModel = mongoose.model("Captain", captainSchema);

module.exports=CaptainModel;
