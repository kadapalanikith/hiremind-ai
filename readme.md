 # Gen AI ATS (Applicant Tracking System)

 A comprehensive Applicant Tracking System powered by Generative AI. This project aims to streamline the recruitment process by leveraging AI for tasks such as interview report generation, resume analysis, and more.

 ## Project Structure

 The project is divided into two main parts: `Backend` (Node.js/Express) and `Frontend` (React/JavaScript).

 ```
 Gen AI ATS/
 ├── Backend/
 │   ├── src/
 │   │   ├── controllers/      # Handles API logic (e.g., auth.controllers.js)
 │   │   ├── models/           # Mongoose schemas (e.g., user.model.js, blacklist.model.js, interviewReport.model.js)
 │   │   ├── middlewares/      # Express middlewares (e.g., auth.middleware.js)
 │   │   └── routes/           # API routes (e.g., auth.routes.js)
 │   └── ...                   # Other backend files
 ├── Frontend/
 │   ├── node_modules/         # Frontend dependencies (e.g., axios)
 │   └── ...                   # React components, pages, services, etc.
 └── README.md
 ```

 ## Technologies Used

 ### Backend
 *   **Node.js**: JavaScript runtime environment.
 *   **Express.js**: Web application framework for Node.js.
 *   **Mongoose**: MongoDB object modeling tool.
 *   **MongoDB**: NoSQL database.
 *   **Bcrypt.js**: Library for hashing passwords.
 *   **JSON Web Tokens (JWT)**: For authentication and authorization.
 *   **Cookie-parser**: Middleware for parsing cookies.

 ### Frontend
 *   **React**: A JavaScript library for building user interfaces. (Inferred from common patterns, though not explicitly shown in provided files beyond `axios`)
 *   **Axios**: Promise-based HTTP client for the browser and Node.js.
 *   **ESLint**: Pluggable JavaScript linter.
 *   **Chokidar**: A robust, cross-platform, and efficient file watcher module.
 *   **Babel**: JavaScript compiler.

 ## Setup Instructions

 ### 1. Clone the repository
 ```bash
 git clone <repository_url>
 cd "Gen AI ATS"
 ```

 ### 2. Backend Setup
 ```bash
 cd Backend
 npm install
 ```
 Create a `.env` file in the `Backend` directory and add your environment variables.
 Example `.env`:
 ```
 PORT=5000
 MONGO_URI=mongodb://localhost:27017/gen_ai_ats
 JWT_SECRET=your_jwt_secret_key
 ```

 To run the backend server:
 ```bash
 npm start # or node src/server.js if you have a server.js file
 ```

 ### 3. Frontend Setup
 ```bash
 cd ../Frontend
 npm install
 ```
 To run the frontend development server:
 ```bash
 npm start
 ```

 ## API Endpoints (Authentication Example)

 The backend exposes the following authentication-related endpoints:

 *   **`POST /api/auth/register`**: Register a new user.
 *   **`POST /api/auth/login`**: Login an existing user.
 *   **`GET /api/auth/logout`**: Log out the current user (clears cookie, blacklists token).
 *   **`GET /api/auth/get-me`**: Get information about the currently logged-in user (requires authentication).

 Refer to the `auth.routes.js` file for more details on these and other potential routes.

 ## Database Models

 Key database models include:
 *   **`User`**: Stores user authentication details (username, email, password).
 *   **`Blacklist`**: Stores invalidated JWT tokens for logout functionality.
 *   **`InterviewReport`**: Stores detailed interview reports, including job description, resume, self-description, match score, technical and behavioral questions, skill gaps, and preparation plans.
```
<!--
[PROMPT_SUGGESTION]Could you add a section on how to deploy this application to a cloud provider like Heroku or AWS?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Generate some example `cURL` commands for the authentication API endpoints mentioned in the README.[/PROMPT_SUGGESTION]
