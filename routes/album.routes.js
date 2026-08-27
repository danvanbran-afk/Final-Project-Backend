const router = require("express").Router();
const Album = require("../models/Album.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const axios = require("axios");

// GET /api/albums/search - Search Last.fm API (MUST be before /:id)
router.get("/search", async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const apiKey = process.env.LASTFM_API_KEY;
    const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${q}&api_key=${apiKey}&format=json`;

    const response = await axios.get(lastFmUrl);
    
    // Map Last.fm's nested structure into a clean array for the frontend
    const matches = response.data.results.albummatches.album.map((a) => {
      return {
        title: a.name,
        artist: a.artist,
        coverImageUrl: a.image[a.image.length - 1]["#text"] || ""
      };
    });

    res.json(matches);
  } catch (error) {
    console.error("Last.fm API Error:", error);
    res.status(500).json({ message: "Failed to fetch data from Last.fm" });
  }
});

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
  // Destructure coverImageUrl alongside the other fields
  const { title, artist, genre, releaseYear, coverImageUrl } = req.body;

  try {
    const newAlbum = await Album.create({
      title,
      artist,
      genre,
      releaseYear: Number(releaseYear),
      coverImageUrl, // Save the image to the database
      owner: req.payload._id,
    });
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(400).json({ message: "Error creating album. Check required fields.", error: error.message });
  }
});

// PUT edit album (Protected + Strict Owner Validation)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (album.owner && album.owner.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Unauthorized: You can only edit your own albums" });
    }

    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ message: "Error updating album", error });
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