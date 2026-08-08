const express = require("express");
const router = express.Router();
const Album = require("../models/Album.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /api/albums - Create a new album
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { title, artist, genre, releaseYear, coverImageUrl } = req.body;
    
    const newAlbum = await Album.create({
      title,
      artist,
      genre,
      releaseYear,
      coverImageUrl,
      addedBy: req.payload._id // Extracted from the JWT token!
    });
    
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(400).json({ message: "Error creating album", error });
  }
});

// GET /api/albums - Get all albums (Public)
router.get("/", async (req, res) => {
  try {
    // .populate() fetches the actual user data instead of just the ID
    const albums = await Album.find().populate("addedBy", "username");
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: "Error fetching albums", error });
  }
});

// GET /api/albums/:albumId - Get a specific album (Public)
router.get("/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("addedBy", "username");
    
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: "Error fetching album", error });
  }
});

// PUT /api/albums/:albumId - Update a specific album
router.put("/:albumId", isAuthenticated, async (req, res) => {
  try {
    const { albumId } = req.params;
    
    const album = await Album.findById(albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });
    
    // Security check: Does the logged-in user own this album?
    if (album.addedBy.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Not authorized to edit this album" });
    }

    const updatedAlbum = await Album.findByIdAndUpdate(albumId, req.body, { new: true });
    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(400).json({ message: "Error updating album", error });
  }
});

// DELETE /api/albums/:albumId - Delete a specific album
router.delete("/:albumId", isAuthenticated, async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId);
    if (!album) return res.status(404).json({ message: "Album not found" });
    
    // Security check: Does the logged-in user own this album?
    if (album.addedBy.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Not authorized to delete this album" });
    }

    await Album.findByIdAndDelete(albumId);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting album", error });
  }
});

module.exports = router;