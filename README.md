# Music Review Platform

## Description
A full-stack single-page application (SPA) built for music enthusiasts to discover albums, track their favorite artists, and share reviews. The platform utilizes a decoupled architecture with a React frontend and an Express/Node.js REST API backend.

## Tech Stack
* **Frontend:** React (Hooks, Context API), React Router, Axios, Vite.
* **Backend:** Node.js, Express, RESTful API architecture.
* **Database:** MongoDB, Mongoose.
* **Authentication:** JSON Web Tokens (JWT), bcryptjs for password hashing.

## Data Models
The application relies on 3 primary data models with relational referencing:
1. **User:** Stores authentication credentials and user profile data.
2. **Album:** Stores music metadata (Title, Artist, Genre, Release Year).
3. **Review:** Stores user-generated content, referencing both the User who created it and the Album it targets (2 Relationships).

## Features
* **Authentication:** Secure user signup, login, and session management using JWT.
* **Global State:** Real-time UI updates reflecting user authentication status via React Context.
* **CRUD Operations:** 
  * Create: Users can post reviews to specific albums.
  * Read: Fetch dynamic lists of albums and specific album detail views.
  * Update: Users can modify their existing reviews.
  * Delete: Users can remove their reviews from the database.
* **Responsive Design:** Mobile-first architecture ensuring accessibility across all devices.
* **Error Handling:** Graceful API error catching and custom 404 routing.

## API Endpoints (Backend Routes)
| HTTP Method | Endpoint | Request Body | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | { username, email, password } | Registers a new user |
| POST | `/api/auth/login` | { email, password } | Authenticates user and returns JWT |
| GET | `/api/auth/verify` | Headers: Bearer <token> | Verifies current JWT |
| GET | `/api/albums` | None | Returns an array of all albums |
| GET | `/api/albums/:id` | None | Returns details for a specific album |
| POST | `/api/reviews` | { albumId, content, rating } | Creates a new review (Protected) |

## Setup and Installation

### Backend
1. Clone the backend repository: `[Insert Backend Repo Link]`
2. Install dependencies: `npm install`
3. Create a `.env` file with `PORT`, `MONGO_URI`, and `TOKEN_SECRET`.
4. Start the server: `npm run dev`

### Frontend
1. Clone the frontend repository: `[Insert Frontend Repo Link]`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`