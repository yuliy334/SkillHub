import mongoose from "mongoose";
import { type } from "os";
import { string } from "zod";
import { required } from "zod/mini";

const advertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userWanted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  userOffers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  deals: [
    new mongoose.Schema({
      requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      requestorWanted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
      }],
      requestorOffers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
      }],
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    }, { _id: true, timestamps: true }) 
  ],
}, { timestamps: true });

export default mongoose.model("Advert", advertSchema);
