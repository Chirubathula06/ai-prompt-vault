# 🚀 AI Prompt Vault - Full Stack AI Prompt Management Platform

<div align="center">

### 🧠 Store • Organize • Search • Favorite • Manage AI Prompts

A modern full-stack web application that helps users securely save, organize, search, and manage their AI prompts in one centralized vault.

Built with **Node.js**, **Express.js**, **MongoDB Atlas**, **JWT Authentication**, and a beautiful responsive frontend.

🌐 **Live Demo:** https://ai-prompt-vault-zbdc.onrender.com

</div>

---

## 📖 Project Overview

AI Prompt Vault is a complete full-stack prompt management platform designed for AI enthusiasts, developers, marketers, writers, and professionals who use AI tools daily.

Instead of losing prompts in notes, documents, or chat history, users can securely store, categorize, search, favorite, and manage their prompts through a clean and modern dashboard.

---

## ✨ Key Features

### 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcryptjs
* Protected API Routes
* User-Specific Data Access

---

### 📂 Prompt Management

* Create New Prompts
* Edit Existing Prompts
* Delete Prompts
* View Prompt Library
* Copy Prompts to Clipboard
* Save Unlimited Prompts

---

### 🔍 Search & Filtering

* Real-Time Prompt Search
* Category-Based Filtering
* Tag-Based Organization
* Quick Prompt Discovery

---

### ⭐ Favorites System

* Mark Prompts as Favorite
* View Favorite Prompts Instantly
* Better Prompt Organization

---

### 🎨 Modern User Interface

* Beautiful Glassmorphism Design
* Responsive Layout
* Mobile Friendly
* Interactive Dashboard
* Smooth User Experience

---

### ☁️ Cloud Deployment

* MongoDB Atlas Integration
* Render Deployment
* Production Environment Configuration
* Secure Environment Variables

---

## 🏗️ System Architecture

```text
Frontend (HTML, CSS, JavaScript)
            │
            ▼
      Express.js API
            │
            ▼
      JWT Authentication
            │
            ▼
        MongoDB Atlas
```

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Deployment

* Render
* MongoDB Atlas

---

## 📁 Project Structure

```text
ai-prompt-vault/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── public/
│
├── server.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Chirubathula06/ai-prompt-vault.git
cd ai-prompt-vault
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

```bash
cp .env.example .env
```

### Configure .env

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai_prompt_vault

JWT_SECRET=your_super_secret_jwt_key
```

### Start Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## 🔗 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Prompt Management

```http
GET    /api/prompts
POST   /api/prompts
PUT    /api/prompts/:id
DELETE /api/prompts/:id
```

### Search

```http
GET /api/prompts/search?q=resume
```

### Favorites

```http
PATCH /api/prompts/:id/favorite
```

---

## 🎯 Real-World Use Cases

### 👨‍💻 Developers

Store coding prompts, debugging prompts, code review templates, and architecture prompts.

### ✍️ Writers

Save blog-writing prompts, content creation prompts, and storytelling templates.

### 📈 Marketers

Manage marketing campaign prompts, ad copy prompts, and social media generators.

### 💼 Job Seekers

Store resume improvement prompts, interview preparation prompts, and career coaching prompts.

### 🤖 AI Power Users

Create a personal prompt library for ChatGPT, Claude, Gemini, and other AI tools.

---

## 🔒 Security Features

* JWT Token Authentication
* Password Hashing
* Protected Routes
* User-Based Data Isolation
* Environment Variable Protection

---

## 🌟 Future Enhancements

* AI Prompt Sharing
* Public Prompt Marketplace
* Dark/Light Theme Toggle
* Prompt Analytics
* AI Prompt Recommendations
* Prompt Collections
* Export & Import Prompts
* User Profiles

---

## 👨‍💻 Developer

### Chiranjeevi Bathula

Full Stack Developer

* Node.js
* Express.js
* MongoDB
* JavaScript
* REST APIs
* Authentication Systems

GitHub: https://github.com/Chirubathula06

---

## 📄 License

This project is licensed under the MIT License.

---

### ⭐ If you found this project useful, consider giving it a star on GitHub!
