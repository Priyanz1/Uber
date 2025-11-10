const mongoose=require("mongoose");

const ridingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },

    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Captain',
      required: false,
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', "ongoing",'cancelled', 'rejected','completed'],
      default: 'pending',
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    paymentID: {
      type: String,
    },
    orderID: {
      type: String,
    },
    signature: {
      type: String,
    },
  },
  { timestamps: true }
);

const RidingModel = mongoose.model("RidingModel", ridingSchema );
module.exports=RidingModel;
