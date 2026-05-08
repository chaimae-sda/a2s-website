# A2S Junior Entreprise Website

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

A modern, fully responsive web platform built for the **A2S Junior Entreprise**. This website serves as the digital storefront for the association, showcasing its services, projects, team, and upcoming events to potential clients and student members.

## ✨ Features

* **Dynamic Navigation:** Responsive navigation header with a mobile-friendly menu.
* **Service Showcase:** Detailed pages outlining the professional offerings of the Junior Entreprise.
* **Event Management:** Dedicated section to list and highlight upcoming association events.
* **Project Portfolio:** A showcase of past projects and achievements.
* **Interactive Forms:** Includes a user registration/sign-up form and a contact inquiry form.
* **About Us Section:** Highlights the mission, vision, and team behind A2S.
* **Smooth UX:** Built-in scroll-to-top functionality and a custom 404 error page.
* **Fully Responsive:** Styled with Tailwind CSS to ensure a perfect layout across all device sizes (mobile, tablet, desktop).

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 18.2
* **Build Tool:** Vite (for fast, optimized development)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **HTTP Client:** Axios

### Backend (NEW! 🎉)
* **Runtime:** Node.js
* **Framework:** Express 4.18
* **Database:** MySQL 8.0+
* **Driver:** MySQL2
* **CORS:** Built-in support
* **Environment:** dotenv

## 📂 Project Structure

```
a2s-website/
├── src/                           ← Frontend React
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   │   └── useAPI.js             ← API Hooks (NEW!)
│   ├── data/
│   ├── routes/
│   └── App.jsx
│
├── server/                        ← Backend Express (NEW!)
│   ├── config/
│   │   └── database.js           ← MySQL Connection
│   ├── controllers/              ← Business Logic
│   ├── routes/                   ← API Routes
│   ├── db/
│   │   ├── schema.sql            ← Database Schema
│   │   └── init.js               ← Initialize DB
│   ├── index.js                  ← Main Server
│   ├── .env                      ← Configuration
│   └── package.json
│
├── public/
├── vite.config.js
├── package.json
├── .env
│
├── QUICKSTART.md                 ← Start Here! ⭐
├── INDEX.md                      ← Full Documentation
├── API_DOCUMENTATION.md          ← API Reference
└── README.md
```

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js** (v16+)
- **MySQL** (v8.0+)

### Installation

1. **Configure MySQL** - Edit `server/.env`:
```env
DB_PASSWORD=your_mysql_password
```

2. **Install & Initialize**
```bash
npm install
cd server && npm install && npm run init-db
cd ..
```

3. **Start Servers**

Terminal 1:
```bash
npm run dev          # Frontend on http://localhost:5173
```

Terminal 2:
```bash
cd server && npm run dev   # Backend on http://localhost:5000
```

✅ Done! Visit **[QUICKSTART.md](./QUICKSTART.md)** for detailed instructions.

## 📡 API Endpoints

```
GET    /api/projects           - All projects
GET    /api/projects/:slug     - Single project
GET    /api/team               - Team members
GET    /api/services           - Services
GET    /api/events             - Events
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete reference.

## 💻 Using the API in React

```javascript
import { useProjects } from './hooks/useAPI';

function Projects() {
  const { projects, loading, error } = useProjects();
  
  if (loading) return <div>Loading...</div>;
  return projects.map(p => <div key={p.id}>{p.title}</div>);
}
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | Start here! ⭐ |
| [INDEX.md](./INDEX.md) | Complete documentation index |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | API reference with examples |
| [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) | Detailed setup |
| [INTEGRATION_EXAMPLE.md](./INTEGRATION_EXAMPLE.md) | React examples |
| [ADVANCED_CONFIG.md](./ADVANCED_CONFIG.md) | Security & deployment |

## ✅ What's New

✨ **Full Backend Stack**
- Express.js REST API
- MySQL database with 6 tables
- CRUD operations for all resources
- Connection pooling for performance

✨ **React Hooks for API**
- `useProjects()`, `useTeam()`, `useServices()`, `useEvents()`
- Built-in error and loading states
- Functions for create, update, delete

✨ **Complete Documentation**
- 7 detailed guides
- API examples
- Troubleshooting included

## 🐛 Quick Help

| Issue | Solution |
|-------|----------|
| MySQL "Access denied" | Check DB_PASSWORD in server/.env |
| "Connection refused" | MySQL not running, start it |
| Port already in use | Change SERVER_PORT in server/.env |

See [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md#troubleshooting) for more help.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React
* **Build Tool:** Vite (for fast, optimized development)
* **Styling:** Tailwind CSS (Utility-first CSS framework)
* **Routing:** React Router DOM
* **Icons:** Lucide React (or your chosen icon library)

## 📂 Project Structure

```text
a2s-website/
├── public/
│   └── assets/            # Static assets (images, logos)
├── src/
│   ├── components/        # Reusable UI components (Header, Footer, Layout, etc.)
│   ├── pages/             # Page views (Home, About, Services, Events, Contact, etc.)
│   ├── data/              # Local data files for events, projects, and services
│   ├── routes/            # Application routing configuration
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── tailwind.config.js     # Tailwind design system configuration
└── package.json           # Dependencies and scripts
