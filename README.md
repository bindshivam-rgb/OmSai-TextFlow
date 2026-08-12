# OmSai-TextFlow

A full-stack e-commerce web application built for Om Sai Text Chem to manage textile chemical products, customer orders, authentication, and admin operations.

## 🚀 Live Demo

https://omsai-textflow-1.onrender.com

## 📌 Features

### Customer Features
- User registration and login
- JWT-based authentication
- Browse products
- View product details
- Place orders
- View personal orders
- Track order status
- Forgot password / password reset flow
- Responsive mobile navigation

### Admin Features
- Admin authentication and authorization
- Admin dashboard
- View users, products, and order statistics
- Add products
- Edit products
- Delete/manage products
- View and manage customer orders
- Update order status

### Security
- JWT access-token authentication
- Protected routes
- Role-based authorization
- Password hashing
- Environment variables for sensitive configuration
- `.env` excluded from Git

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- REST API
- JWT
- bcrypt
- Multer

### Database
- MongoDB
- Mongoose

### Email
- Resend

### Deployment
- Render
- GitHub

## 🏗️ Project Structure

```text
OmSai-TextFlow/
│
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .gitignore
└── README.md