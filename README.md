# Peblo Notes

Peblo Notes is a premium, AI-powered workspace designed for focused writing and seamless productivity. Built with Next.js 15, Prisma, and Groq's fast Llama-3 models, it offers real-time editing, intelligent summarization, and task extraction.

## Features

- **Notes Workspace**: distraction-free editor with block-style formatting.
- **AI Intelligence**: Summarize notes, extract action items, and generate titles instantly via Groq API.
- **Productivity Insights**: Visualize your writing habits with data-driven dashboards.
- **Optimized Performance**: Next.js App Router, SSR, and ISR.
- **Premium UX**: Framer Motion transitions, responsive design, and glassmorphism UI.

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js (Google OAuth & Credentials)
- **AI**: Groq API (llama3-70b-8192)
- **Styling**: Tailwind CSS & Framer Motion
- **Editor**: Tiptap
- **Testing**: Vitest & Playwright

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo>
   cd Peblo_Notes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in the required keys.
   ```bash
   cp .env.example .env
   ```

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Production Deployment (Vercel)

The app is optimized for serverless deployments on Vercel.

1. Create a new PostgreSQL database (e.g., Supabase) and update `DATABASE_URL` with connection pooling enabled (`?pgbouncer=true&connection_limit=10`).
2. Push the code to a Git repository linked to Vercel.
3. Configure the following Environment Variables in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `GROQ_API_KEY`
   - `RESEND_API_KEY`
4. The `vercel.json` provides max-duration settings for AI routes to ensure timeouts don't occur.

## Architecture

- `src/app`: Next.js App Router structure. Marketing, Auth, and App domains are segmented.
- `src/components`: UI components organized by domain (`auth`, `notes`, `insights`, `ui`).
- `src/lib`: Core utility functions, AI wrapper, and database configurations.
- `src/hooks`: Custom React hooks for optimistic updates, shortcuts, and insights processing.

## License

MIT License.
