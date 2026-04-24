# Dynamic Feedback Form

A robust, full-stack web application that allows users to provide and manage feedback on various aspects of a product or service. The platform is designed to be user-friendly, responsive, and secure.

## Live Demo
🚀 The application is currently hosted on Render. You can view the live app here:
<<<<<<< HEAD
**[dynamic-feedback-form-production.up.railway.app]**
=======
**[(https://dynamic-feedback-form-production.up.railway.app/)]**
>>>>>>> e8a1efb9fe4affc985950235e7531e3f5bf925b7

## Key Features
- **User Authentication:** Secure signup and login workflows with password hashing, verification, and robust session management.
- **Dynamic Feedback:** Submit, manage, and view dynamic feedback effortlessly across varying dimensions of a product.
- **Responsive UI:** Front-end built with EJS templating and styled beautifully with Tailwind CSS (v4 CLI), guaranteeing a seamless experience across mobile and desktop.
- **Robust Security:** Built-in safeguards including CSRF protection, endpoint rate limiting, and HTTP header security via Helmet.
- **Error Handling:** Graceful error handling for missing routes (`404`) and backend logic.

## Tech Stack
- **Backend Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Templating:** EJS
- **Styling:** Tailwind CSS v4
- **Security Headers:** Helmet
- **Rate Limiting:** express-rate-limit
- **Session:** express-session

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or an external connection URI (like MongoDB Atlas)

### Installation
1. Clone or download the repository, then navigate into the application folder:
   ```bash
   cd Dynamic-Feedback-form
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```

### Configuration
Create a `.env` file in the root of the project to hold your environment variables:
```env
PORT=3005
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secure_session_secret
NODE_ENV=development
```

### Running the Application
To launch the server with `nodemon` (auto-reloading):
```bash
npm run dev
```
*(Alternatively, just run `npm start`)*
