const router = require("express").Router();
const Album = require("../models/Album.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET all albums (Public)
router.get("/", async (req, res) => {
  try {
    const albums = await Album.find().populate("owner");
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: "Error fetching albums", error });
  }
});

// GET specific album by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    // FIX: Removed the invalid .populate("reviews") chain that was crashing the server.
    const album = await Album.findById(req.params.id).populate("owner");
    
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  } catch (error) {
    console.error("Error fetching album details:", error);
    res.status(500).json({ message: "Error fetching album details", error: error.message });
  }
});

// POST create album (Protected)
router.post("/", isAuthenticated, async (req, res) => {
  const { title, artist, genre, releaseYear } = req.body;

  try {
    const newAlbum = await Album.create({
      title,
      artist,
      genre,
      releaseYear: Number(releaseYear),
      owner: req.payload._id,
    });
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(400).json({ message: "Error creating album. Check required fields.", error: error.message });
  }
});

// DELETE album (Protected + Strict Owner Validation)
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.owner && album.owner.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own albums" });
    }

    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting album", error });
  }
});

module.exports = router;