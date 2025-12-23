import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      default: null,
    },
    ratings: [
      {
        rating: Number,
        comment: String,
      },
    ],
    schedule: [
      {
        dayOfWeek: {
          type: Number,
          required: true,
          min: 0,
          max: 6,
        },
        startMin: {
          type: Number,
          required: true,
          min: 0,
          max: 1439,
        },
        endMin: {
          type: Number,
          required: true,
          min: 0,
          max: 1439,
          validate: {
            validator: function (value) {
              return value > this.startMin;
            },
            message: "end time must be after start time",
          },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
