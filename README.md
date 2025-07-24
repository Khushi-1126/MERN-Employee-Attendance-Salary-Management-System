# 👩‍💻 Employee Attendance & Salary Management System

A full-featured Employee Management System built with the MERN stack (MongoDB, Express, React, Node). This web app allows admins to manage employees, track attendance, handle leave requests, and calculate monthly salaries. Employees can mark attendance, request leaves, and view salary records.

---

##  Features

###  Authentication
- Admin and Employee login
- Default password change on first login
- Manual password reset by admin

###  Admin Functionality
- Create employee accounts
- View all employees
- Approve/reject leave requests
- Reset employee passwords
- View salary history and mark as paid
- Access admin dashboard with insights

###  Employee Functionality
- Login and change password
- Mark daily attendance
- Request leave with category and half-day support
- View leave request status
- View salary calculation based on attendance
- Access employee dashboard

---

## 🛠 Tech Stack

| Technology | Description            |
|------------|------------------------|
| React.js   | Frontend (with Tailwind CSS) |
| Node.js    | Backend runtime        |
| Express.js | API & server framework |
| MongoDB    | NoSQL database         |
| Mongoose   | MongoDB ORM            |

---

## 📂 Project Structure

```bash
employee-management-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── App.js
└── README.md
