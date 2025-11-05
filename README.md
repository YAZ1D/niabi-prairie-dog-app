🦫 Niabi Prairie Dog Observation App

A digital habitat mapping and observation system built for Niabi Zoo’s Prairie Dog Habitat, designed to work seamlessly on iPads and desktop browsers.
This system allows zookeepers and interns to log behavioral observations, update burrow positions, and visualize habitat activity — even offline.

Developed as part of a volunteer research & technology collaboration between Niabi Zoological Park and Augustana College.
Originally prototyped with Firebase, now upgraded to Supabase for enhanced real-time sync, authentication, and offline support.

--------------------------------------------------------------------------

🌍 Features

🧭 Interactive Habitat Interface — place, move, and annotate burrows on a live map or blueprint.

📋 Observation Logging — record behaviors and activity data linked to date, time, and observer.

🔐 Authentication System — powered by Supabase (email/password + secure sessions).

🧱 Offline Mode — automatically caches unsynced observations and syncs when back online.

🎨 Niabi Zoo–branded UI — custom TailwindCSS theme inspired by Niabi’s forest-green and amber-yellow palette.

⚡ Built with React + Vite — fast, responsive, and optimized for touch devices (iPad-ready).

--------------------------------------------------------------------------

🛠️ Tech Stack

   Layer → Tool
________________________
 ¤ Frontend → React + Vite.
 
 ¤ Styling → TailwindCSS (Niabi custom theme).
 
 ¤ Authentication → Supabase Auth.
 
 ¤ Storage / Sync → Supabase Database (planned integration).
 
 ¤ Build Tools → ESLint + Prettier.
 
 ¤ Deployment → GitHub Pages / Vercel (optional).

--------------------------------------------------------------------------

🧩 Current Modules

App.jsx – Root controller for login state, offline status, and observation management.

AuthPanel.jsx – Custom Niabi-themed sign-in/sign-up panel with Supabase integration.

UserBar.jsx – Top bar with session info and sign-out controls (coming soon).

/data/ – Local storage sync utilities (in progress).

/assets/ – Branding and reference imagery for habitat visuals.

--------------------------------------------------------------------------

🧪 Local Setup
git clone https://github.com/YAZ1D/niabi-prairie-dog-app.git
cd niabi-prairie-dog-app
npm install
npm run dev

 ¤ Then visit http://localhost:5173

--------------------------------------------------------------------------

📦 Build for Production
npm run build


Output is located in the /dist directory — ready for deployment.

--------------------------------------------------------------------------

🧭 Roadmap

 Burrow placement and drag/drop interface

 Real-time sync with Supabase database

 Observation table (linked to ethogram categories)

 Multi-user log access for staff

 Admin dashboard for exporting data

--------------------------------------------------------------------------

🐾 Credits

Developed by Yazid Mouayn
In collaboration with Niabi Zoological Park
(2025 Research & Technology Project)

📄 Project Proposal (Google Drive):
https://drive.google.com/file/d/1cOFLCgMV8NnflAQnzR8W9By0r1_x7IdI/view
