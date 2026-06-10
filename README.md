# FullStack EMS

FullStack EMS is an Employee Management System frontend built with React and Vite. The project includes a modern login experience with separate Admin and Employee portals, protected-style application pages, and route-based navigation for core EMS modules.

## Features

- Admin and Employee login portal selection
- Separate login form screens for admin and employee users
- React Router based page navigation
- Dashboard route
- Employees route
- Attendance route
- Leave route
- Payslip and print payslip routes
- Settings route
- Toast notification setup with React Hot Toast
- Responsive UI built with Tailwind CSS
- Icons powered by Lucide React

## Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React
- React Hot Toast
- ESLint

## Project Structure

```txt
FullStack-EMS/
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── LoginForm.jsx
    │   │   └── LoginLeftSide.jsx
    │   ├── pages/
    │   │   ├── Attendance.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Employees.jsx
    │   │   ├── Layout.jsx
    │   │   ├── Leave.jsx
    │   │   ├── LoginLanding.jsx
    │   │   ├── Payslip.jsx
    │   │   ├── PrintPayslip.jsx
    │   │   └── Setting.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
