const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /api/reviews/:albumId - Add a review to a specific album
router.post("/:albumId", isAuthenticated, async (req, res) => {
  try {
    const { albumId } = req.params;
    const { rating, comment } = req.body;
    
    const newReview = await Review.create({
      rating,
      comment,
      author: req.payload._id,
      album: albumId
    });
    
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error creating review", error });
  }
});

// GET /api/reviews/:albumId - Get all reviews for a specific album (Public)
router.get("/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;
    // Find reviews for this album and populate the author's username
    const reviews = await Review.find({ album: albumId }).populate("author", "username");
    
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// PUT /api/reviews/:reviewId - Edit a specific review
router.put("/:reviewId", isAuthenticated, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    
    // Security check: Does the logged-in user own this review?
    if (review.author.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Not authorized to edit this review" });
    }
    
    // Update the review
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );
    
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: "Error updating review", error });
  }
});

// DELETE /api/reviews/:reviewId - Delete a specific review
router.delete("/:reviewId", isAuthenticated, async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    
    // Security check: Does the logged-in user own this review?
    if (review.author.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }
    
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting review", error });
  }
});

module.exports = router;