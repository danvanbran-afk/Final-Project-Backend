require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Album = require("./models/Album.model");
const User = require("./models/User.model");

const URI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/music-review-platform";

const albumsToSeed = [
  {
    title: "Abbey Road",
    artist: "The Beatles",
    genre: "Rock",
    releaseYear: 1969,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    genre: "Pop",
    releaseYear: 1982,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"
  },
  {
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    genre: "Hip-Hop", 
    releaseYear: 2015,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png"
  },
  {
    title: "Rumours",
    artist: "Fleetwood Mac",
    genre: "Rock",
    releaseYear: 1977,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG"
  },
  {
    title: "Discovery",
    artist: "Daft Punk",
    genre: "Electronic",
    releaseYear: 2001,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg"
  },
  {
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    genre: "Rock",
    releaseYear: 1973,
    coverImageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png"
  }
];

mongoose
  .connect(URI)
  .then(async (x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    await Album.deleteMany({}); 
    
    let seedAdmin = await User.findOne({ email: "admin@seed.com" });
    if (!seedAdmin) {
      const salt = bcrypt.genSaltSync(10);
      seedAdmin = await User.create({
        username: "SeedAdmin",
        email: "admin@seed.com",
        password: bcrypt.hashSync("dummyhashedpassword123", salt)
      });
    }

    const albumsWithOwner = albumsToSeed.map(album => ({ ...album, owner: seedAdmin._id }));
    const createdAlbums = await Album.insertMany(albumsWithOwner);
    console.log(`SUCCESS! Inserted ${createdAlbums.length} albums with cover art!`);
    
    return mongoose.connection.close();
  })
  .catch(err => console.error("Error seeding:", err));