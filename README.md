# 🚀 The Friendly DEV

<div align="center">
  <img src="public/images/project-2.png" width="800" alt="Project Banner">
  <br />
  <br />
  <a href="https://github.com/odyniz/friendly-DEV">
    <img src="https://img.shields.io/badge/Code-GitHub-181717?style=for-the-badge&logo=github" alt="GitHub Code">
  </a>
  <a href="https://friendly-dev.example.com">
    <img src="https://img.shields.io/badge/Live-Demo-4CAF50?style=for-the-badge&logo=vercel" alt="Live Version">
  </a>
</div>

---

### ✨ Overview

**The Friendly DEV** is a modern, high-performance portfolio application built with **React Router 7**. It showcases a clean, professional design aimed at attracting recruiters and demonstrating full-stack capabilities with a focus on user experience and animations.

---

## 🛠️ Tech Stack

<div align="center">

| Category | Tools |
| :--- | :--- |
| **Framework** | ![React Router 7](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=react-router&logoColor=white) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Animations** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| **Icons** | ![React Icons](https://img.shields.io/badge/React_Icons-e91e63?style=flat-square&logo=react) |
| **Backend (Mock)** | ![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=flat-square&logo=json) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |

</div>

---

## 🚀 Getting Started

### 📋 Requirements

- **Node.js**: v20 or higher
- **npm**: Package manager

### ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/odyniz/friendly-DEV.git
   cd friendly-DEV
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   Create a `.env` file in the root:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

### 💻 Development

Start the mock backend and the development server:

```bash
# Terminal 1: Mock API
npm run json-server

# Terminal 2: Vite Dev Server
npm run dev
```

App available at: `http://localhost:5173`

---

## 📂 Project Structure

```text
├── app/
│   ├── components/       # 🧱 Reusable UI components
│   ├── routes/           # 🛣️ Page routes and layouts
│   ├── app.css           # 🎨 Global styles (Tailwind)
│   ├── root.tsx          # 🌳 Root component
│   ├── routes.ts         # 🗺️ Route configurations
│   └── types.ts          # 🏷️ TypeScript type definitions
├── data/
│   └── db.json           # 🗄️ Mock data for json-server
├── public/               # 📂 Static assets (images, icons)
├── Dockerfile            # 🐳 Docker configuration
├── react-router.config.ts # ⚙️ React Router configuration
├── tsconfig.json         # ⚙️ TypeScript configuration
└── vite.config.ts        # ⚙️ Vite configuration
```

---

## 📜 Available Scripts

- `npm run dev`: Starts the development server with HMR.
- `npm run build`: Creates a production-ready build.
- `npm run start`: Starts the production server.
- `npm run typecheck`: Runs TypeScript compiler checks.
- `npm run json-server`: Starts the local JSON server on port 8000.

---

## 🐳 Deployment

### Docker

```bash
docker build -t friendly-dev .
docker run -p 3000:3000 friendly-dev
```

---

## 👋 Talk to Me

<table align="center">
  <tr>
    <td align="center">
      <img src="public/images/profile.jpg" width="150px;" alt="Robson Muniz"/><br />
      <sub><b>Robson Muniz</b></sub>
    </td>
    <td>
      <p>I'm a passionate web developer focused on building clean and user-friendly digital experiences. Let's connect!</p>
      <ul>
        <li>🌐 <b>Website:</b> <a href="https://robsonmuniz.dev">robsonmuniz.dev</a></li>
        <li>🐙 <b>GitHub:</b> <a href="https://github.com/odyniz">@odyniz</a></li>
        <li>📫 <b>Contact:</b> <a href="mailto:contact@robsonmuniz.dev">Email Me</a></li>
        <li>📍 <b>Location:</b> Portugal</li>
      </ul>
    </td>
  </tr>
</table>

---

<div align="center">
  Build with ❤️ by <b>Robson Muniz</b>, Portugal
</div>
