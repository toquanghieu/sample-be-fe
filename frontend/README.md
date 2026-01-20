# Shoe Collection Frontend

A modern React application for managing your shoe collection.

## Features

- 🔐 JWT Authentication (Login/Register)
- 👟 View, Add, and Delete shoes
- 🎨 Beautiful dark theme UI with Tailwind CSS
- ⚡ Built with Vite for fast development

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   │   ├── AuthPage.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── layout/         # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   └── shoes/          # Shoe management components
│   │       ├── AddShoeForm.tsx
│   │       ├── ShoeItem.tsx
│   │       └── ShoeList.tsx
│   ├── context/
│   │   └── AuthContext.tsx # Authentication state management
│   ├── services/
│   │   └── api.ts          # Axios API client
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running on port 3000

### Installation

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Create `.env` file from example:
   ```bash
   cp env.example .env
   ```
   
   Or create manually with:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Environment Variables

| Variable       | Description           | Default                      |
|---------------|-----------------------|------------------------------|
| VITE_API_URL  | Backend API base URL  | http://localhost:3000/api    |

## Scripts

| Script          | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start development server       |
| `npm run build` | Build for production           |
| `npm run preview` | Preview production build     |
| `npm run lint`  | Run ESLint                     |
