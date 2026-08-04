const { Schema, model } = require("mongoose");

const albumSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Album title is required."],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "Artist name is required."],
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      // Enums are great for standardizing data
      enum: ["Rock", "Pop", "Hip-Hop", "Jazz", "Electronic", "Classical", "Other"], 
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    coverImageUrl: {
      type: String,
      default: "https://via.placeholder.com/300x300?text=No+Cover",
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Album", albumSchema);