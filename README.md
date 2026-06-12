# AI Prompt Vault - Full Stack Project

A complete full-stack AI Prompt Vault built with Node.js, Express, MongoDB, JWT authentication and a beautiful responsive frontend.

## Features

- Beautiful landing/login/register UI
- JWT authentication
- User-specific prompt dashboard
- Create, edit, delete prompts
- Search prompts
- Filter by categories
- Favorite prompts
- Copy prompt to clipboard
- MongoDB Atlas support

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open in browser:

```txt
http://localhost:5000
```

## .env Example

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai_prompt_vault?retryWrites=true&w=majority
JWT_SECRET=my_ai_prompt_vault_secret_key_123456789
```

## Important

Do not upload `.env` to GitHub. It contains your database password.

## API Routes

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/prompts`
- POST `/api/prompts`
- GET `/api/prompts/search?q=resume`
- PUT `/api/prompts/:id`
- PATCH `/api/prompts/:id/favorite`
- DELETE `/api/prompts/:id`
