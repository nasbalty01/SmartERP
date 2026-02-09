# SmartERP - Production Ready MERN ERP System

SmartERP is a comprehensive, modular ERP system built with the MERN stack (MongoDB, Express, React, Node.js). It features core modules like CRM, Sales, Inventory, Purchase, Accounting, and HR, providing a solid foundation for business management.

## 🚀 Features

- **Modular Architecture**: Easy to extend and maintain.
- **Role-Based Access Control (RBAC)**: Secure access for Admin, Manager, and Employee roles.
- **RESTful API**: Well-documented API using Swagger.
- **Responsive Dashboard**: Beautiful and intuitive UI built with Material UI.
- **Core Modules**:
  - **CRM**: Manage leads and convert them to customers.
  - **Sales**: Create and track sales orders.
  - **Inventory**: Product management, stock tracking, and categories.
  - **Purchase**: Manage vendors and purchase orders.
  - **Accounting**: Invoice generation and payment tracking.
  - **HR**: Employee records and management.
- **Data Visuals**: Integrated support for product images and user avatars.

## 🛠 Tech Stack

- **Frontend**: React, Vite, Material UI, Axios, React Router.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Joi, Winston.
- **Documentation**: Swagger UI.

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nasir0347/SmartERP.git
   cd SmartERP
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on the provided template
   # PORT=5000
   # MONGO_URI=mongodb://localhost:27017/smarterp
   # JWT_SECRET=your_secret_key
   npm run seed # To populate initial data with images
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📸 Screenshots

*(Add screenshots here after deploying or running locally)*

- **Login Page**: Secure JWT-based authentication.
- **Dashboard**: Overview of business metrics.
- **Module Views**: CRUD interfaces with image support.

## 📖 API Documentation

Access the Swagger API documentation at: `http://localhost:5000/api-docs`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
