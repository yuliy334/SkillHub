import mongoose from "mongoose";

const advertSchema = new mongoose.Schema(
  {
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
      new mongoose.Schema(
        {
          requesterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          requestorWanted: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Skill",
              required: true,
            },
          ],
          requestorOffers: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Skill",
              required: true,
            },
          ],
          scheduleSlotId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
          startTime: {
            type: Date,
            required: true,
          },
          endTime: {
            type: Date,
            required: true,
          },
          status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
          },
        },
        { _id: true, timestamps: true },
      ),
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Advert", advertSchema);
