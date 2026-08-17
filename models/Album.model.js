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
      required: [true, "Genre is required."],
      trim: true,
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required."],
    },
    // NEW: Added field for the image URL with a default aesthetic fallback
    coverImageUrl: { 
      type: String, 
      default: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop" 
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Album", albumSchema);