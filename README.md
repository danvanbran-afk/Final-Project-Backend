# 🎵 MusicPlatform — Full-Stack MERN Application

MusicPlatform is a full-stack web application that allows users to discover music albums, create new album entries, and share community reviews. Built with a decoupled MERN stack architecture, it features secure JWT authentication, RESTful API communication, and a mobile-first responsive user interface.

---

## 📖 About the Project

This project was developed as a comprehensive full-stack MVP to demonstrate CRUD operations, relational database modeling, and token-based authentication. Users can browse a public catalog of albums, inspect detailed album metadata, and authenticate to contribute new albums and star-rated reviews to the database.

---

## 🚀 Tech Stack

### Frontend
*   **React (Vite):** Component-based UI rendering and dynamic state management.
*   **React Router DOM:** Client-side routing with protected route wrappers (`IsPrivate`).
*   **Axios:** HTTP client for communicating with the Express API.
*   **Context API:** Global state management for user authentication (`AuthContext`).
*   **CSS3:** Custom mobile-first responsive styling and utility-driven design.

### Backend
*   **Node.js & Express.js:** RESTful API architecture and server-side middleware.
*   **MongoDB & Mongoose:** NoSQL database modeling with schemas for Users, Albums, and Reviews.
*   **JSON Web Tokens (JWT):** Stateless, secure session authentication.
*   **Bcrypt.js:** Password hashing and encryption.
*   **Cors & Dotenv:** Security headers and environment configuration.

---

## ✨ Key Features

*   **User Authentication & Security:** Full sign-up and login flows with password encryption and JWT session storage.
*   **Protected Routes:** Custom React wrapper components that shield creation forms and review actions from unauthorized visitors.
*   **Full CRUD Functionality:**
    *   **Create:** Authenticated users can publish new albums and submit star-rated reviews.
    *   **Read:** Public viewing of the album grid and detailed individual album pages.
    *   **Update & Delete:** Scalable architecture ready for author-restricted modifications.
*   **Mobile-First Responsive UI:** Fluid grid layouts that adapt seamlessly from 375px mobile screens up to multi-column desktop displays.
*   **Automated Database Seeding:** Built-in `seed.js` script for instant population of mock database states during development.

---

## 🛠️ Getting Started & Installation

Because this application uses a decoupled architecture, you must run the backend server and frontend client in two separate terminal windows.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 1. Backend Setup (Port 5005)
```bash
# Clone the repository and navigate into the server directory
cd musicplatform-backend

# Install dependencies
npm install

# Create a .env file in the root directory with the following variables:
# PORT=5005
# MONGO_URI=mongodb://localhost:27017/musicplatform
# TOKEN_SECRET=your_super_secret_key_here

# (Optional) Seed the database with initial albums
node seed.js

# Start the development server
npm run dev