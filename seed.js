require("dotenv").config(); // To access your MONGO_URI
const mongoose = require("mongoose");
const Album = require("./models/Album.model"); // Adjust this path if your model is located elsewhere!

// 1. Define the array of mock data
const albumsToSeed = [
  {
    title: "Abbey Road",
    artist: "The Beatles",
    genre: "Rock",
    releaseYear: 1969
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    genre: "Pop",
    releaseYear: 1982
  },
  {
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    genre: "Hip Hop",
    releaseYear: 2015
  },
  {
    title: "Rumours",
    artist: "Fleetwood Mac",
    genre: "Soft Rock",
    releaseYear: 1977
  },
  {
    title: "Discovery",
    artist: "Daft Punk",
    genre: "Electronic",
    releaseYear: 2001
  },
  {
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    genre: "Progressive Rock",
    releaseYear: 1973
  }
];

// 2. Connect to the database and insert the data
mongoose
  .connect(process.env.MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    
    // Optional: Clear the collection before seeding to avoid duplicates
    return Album.deleteMany({}); 
  })
  .then(() => {
    // Insert the array of albums
    return Album.insertMany(albumsToSeed);
  })
  .then((createdAlbums) => {
    console.log(`Successfully created ${createdAlbums.length} albums!`);
    
    // Disconnect safely once the operation is complete
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Database connection closed.");
  })
  .catch((err) => {
    console.error("Error seeding the database: ", err);
    mongoose.connection.close();
  });