# Dynamic Feedback Form

A full-stack feedback management app built with Node.js, Express, MongoDB, EJS, and Tailwind CSS.

## Live Demo

- Railway: https://dynamic-feedback-form-production.up.railway.app

## Features

- User authentication with signup, login, logout, and session-based access control.
- Feedback CRUD with role-based permissions (`user` and `admin`).
- Responsive UI with server-rendered EJS templates and Tailwind CSS.
- Security middleware: Helmet, CSRF protection, and rate limiting.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- EJS templating
- Tailwind CSS v4
- `express-session` + `connect-mongo`
- Helmet + `express-rate-limit`

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- MongoDB connection string (local MongoDB or MongoDB Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file at project root:

```env
PORT=3005
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=a_long_random_secret_value
NODE_ENV=development
# Optional: set when running behind reverse proxy (Railway/Render/Nginx)
TRUST_PROXY=1
```

### Run

```bash
npm run dev
```

or

```bash
npm start
```

## Production Notes

- `NODE_ENV=production` requires `SESSION_SECRET` and `MONGO_URI`.
- Session cookies are `secure` in production and use `sameSite: none`.
- Admin role should be assigned via controlled process, not public signup.
