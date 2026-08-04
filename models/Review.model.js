const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxLength: [500, "Review comment cannot exceed 500 characters."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);