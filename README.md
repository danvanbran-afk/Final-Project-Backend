## 🗺️ Client Routes (Frontend)

| Path                 | Component            | Permissions | Behavior                                   |
|----------------------|----------------------|-------------|--------------------------------------------|
| `/`                  | `HomePage`           | Public      | Displays all albums with search and filter |
| `/signup`            | `SignupPage`         | Anon only   | Form to create a new account               |
| `/login`             | `LoginPage`          | Anon only   | Form to log in to an existing account      |
| `/albums/:id`        | `AlbumDetailsPage`   | Public      | Shows album details and community reviews  |
| `/albums/create`     | `AddAlbumPage`       | User only   | Searches Last.fm and creates a new album   |
| `/albums/edit/:id`   | `EditAlbumPage`      | Album Owner | Updates existing album details             |
| `*`                  | `NotFoundPage`       | Public      | 404 Catch-All                              |

---

## 🔌 API Endpoints (Backend Routes)

| HTTP Method | URL                      | Request Body                                         | Success Status | Description                       |
|-------------|--------------------------|------------------------------------------------------|----------------|-----------------------------------|
| **POST**    | `/api/auth/signup`       | `{username, email, password}`                        | 201            | Creates a new user                |
| **POST**    | `/api/auth/login`        | `{email, password}`                                  | 200            | Authenticates user, returns JWT   |
| **GET**     | `/api/auth/verify`       | *(empty)*                                            | 200            | Verifies active JWT token         |
| **GET**     | `/api/albums`            | *(empty)*                                            | 200            | Returns all albums                |
| **POST**    | `/api/albums`            | `{title, artist, genre, releaseYear, coverImageUrl}` | 201            | Creates a new album               |
| **GET**     | `/api/albums/:id`        | *(empty)*                                            | 200            | Returns a specific album          |
| **PUT**     | `/api/albums/:id`        | `{title, artist, genre, releaseYear, coverImageUrl}` | 200            | Updates a specific album          |
| **DELETE**  | `/api/albums/:id`        | *(empty)*                                            | 200            | Deletes a specific album          |
| **GET**     | `/api/reviews/:albumId`  | *(empty)*                                            | 200            | Returns all reviews for an album  |
| **POST**    | `/api/reviews`           | `{comment, rating, albumId}`                         | 201            | Creates a new review              |
| **PUT**     | `/api/reviews/:id`       | `{comment, rating}`                                  | 200            | Updates a review                  |
| **DELETE**  | `/api/reviews/:id`       | *(empty)*                                            | 200            | Deletes a review                  |

---

## 🗄️ Database Models

**User**
* `username`: String (required, unique)
* `email`: String (required, unique)
* `password`: String (required)

**Album**
* `title`: String (required)
* `artist`: String (required)
* `genre`: String (required)
* `releaseYear`: Number (required)
* `coverImageUrl`: String
* `owner`: ObjectId (ref: 'User') - *Relationship*

**Review**
* `comment`: String (required)
* `rating`: Number (required)
* `album`: ObjectId (ref: 'Album') - *Relationship*
* `author`: ObjectId (ref: 'User') - *Relationship*

---

## 📋 Backlog & Planning
* [ ] Add user profile pages to display individual review history.
* [ ] Implement Spotify API for audio snippet previews.
* [ ] Add a dark/light mode toggle.

---

## 🔗 Links
* **Live Deployment:** [https://musicplatform2026.netlify.app](https://musicplatform2026.netlify.app)
* **Trello / Kanban Board:** [https://trello.com/b/xs60n6t2](https://trello.com/b/xs60n6t2)
* **Presentation Slides:** [https://docs.google.com/presentation/d/1U3bHkcpmaI4A9pLSryf04kB3i1_Du7fSERjiSjRAf4I/edit?usp=sharing](https://docs.google.com/presentation/d/1U3bHkcpmaI4A9pLSryf04kB3i1_Du7fSERjiSjRAf4I/edit?usp=sharing)x