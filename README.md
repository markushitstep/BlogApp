# KitGlobal - Blog App

This is a simple blog application built as a test assignment. It allows users to add, edit, and delete blog posts, as well as leave, edit, and remove comments. All data is stored in **Firebase**. The app is built using **React**, **Redux Toolkit**, **TypeScript**, **Zod**, **React Hook Form**, and **Tailwind CSS**.

## 🚀 Features

- 🔥 Firebase integration
- 📝 View list of blog posts
- ➕ Create new blog post with validation (Zod + React Hook Form)
- ✏️ Edit and delete blog posts
- 📄 Navigate to a blog details page with comments
- 💬 Add comments with validation
- 🗑️ Edit and delete comments
- ⚙️ Global state management using Redux Toolkit
- 💅 Styled with Tailwind CSS
- ✅ Fully typed with TypeScript

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Firebase**
- **Redux Toolkit (RTK)**
- **React Router DOM**
- **Zod** for schema validation
- **React Hook Form**
- **Tailwind CSS**
- **React Toastify** for notifications
- **Jest + React Testing Library** for testing

## 📦 Installation

1. Clone the repository: 

```bash
git clone https://github.com/your-username/blog.git
cd blog

2. Install dependencies:

npm install

3. Create .env file in the root and add your Firebase configuration:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

4. Start the development server:

npm start

