# Peblo Notes - Full Stack Developer Challenge

Welcome to Peblo Notes, a modern, lightweight, collaborative, and AI-powered notes workspace built for the Peblo Full Stack Developer Challenge!

## 🚀 Overview

Peblo Notes is a comprehensive full-stack application built to deliver an exceptional note-taking experience. The platform combines a sleek, modern "Liquid Glass" user interface with robust backend architecture and intelligent AI features. 

This repository contains the complete full-stack codebase. It is built as a unified Next.js 16 (App Router) application that effortlessly scales to handle both frontend capabilities and backend APIs.

### 🎯 Key Requirements Achieved

1. **Authentication**: Secure user authentication featuring Google OAuth and credential login via NextAuth.js.
2. **Notes Workspace**: Rich text editor with auto-save, tagging system, categories, and archive capabilities.
3. **AI Integration**: Powered by Groq AI, delivering lightning-fast note summaries, action item extraction, and intelligent title suggestions.
4. **Search & Filtering**: Instantly discover notes through keyword search, tag filtering, and sorting capabilities.
5. **Public Share Page**: Generate public, read-only links to share notes without requiring the viewer to log in.
6. **Productivity Insights**: A comprehensive dashboard showing total notes, recent activity, top tags, and a weekly activity trend chart.

### ⭐ Extra Accomplishments (The "Nice to Haves")

- **Modern "Liquid Glass" UI**: A premium design system using TailwindCSS, Framer Motion, and Radix UI primitives.
- **Rich Text Editing**: Integrated Tiptap for a polished and robust Markdown-like editing experience.
- **Optimistic UI Updates**: Highly responsive interface that updates immediately upon interaction.
- **Serverless Database**: PostgreSQL database powered by Neon, managed via Prisma ORM for seamless type safety and scalability.
- **Dark Mode**: Thoughtful support for light and dark themes.

---

## 📖 User Guide

### 1. Prerequisites
- Node.js (v20+)
- PostgreSQL Database (e.g., Neon or local)
- API Keys for Google OAuth, Resend, and Groq AI.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone <your-repo-url>
cd Peblo_Notes
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and use the `.env.example` format (or the provided env) to configure your secrets. Never commit your `.env` to version control.
```env
DATABASE_URL="your-neon-postgres-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
GROQ_API_KEY="your-groq-api-key"
RESEND_API_KEY="your-resend-api-key"
```

### 4. Database Setup
Push the Prisma schema to your configured database:
```bash
npx prisma db push
```

### 5. Running the Application
Start the development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to experience Peblo Notes!

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS & shadcn/ui
- **Database**: PostgreSQL (Neon) & Prisma ORM
- **Authentication**: NextAuth.js
- **AI Provider**: Groq SDK
- **Animations**: Framer Motion

---

## ☁️ Deployment Notes

Since this is a unified Next.js application, both the frontend and backend are deployed together. There is no need for a separate backend deployment on platforms like Render. The entire application (UI + API routes) is deployed seamlessly on **Vercel**.

---

*Done with love by G.Vishal FullStack AI & Mobile Developer*
