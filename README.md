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
