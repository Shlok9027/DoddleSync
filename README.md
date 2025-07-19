# 🚀 DoddleSync – Full-Stack Service-Based Collaboration Platform

![DoddleSync Banner](https://doddlesync.onrender.com/)

DoddleSync is a full-featured, responsive MERN stack application that connects clients and service providers through secure authentication, real-time chat, inquiry management, and payment verification. It offers dedicated frontend and admin panels with a seamless user experience and a powerful backend.

---

## 🌟 Features

### ✅ User Panel
- **OTP-Based Email Verification** using `nodemailer`
- **Fully Responsive Interface** with animated components using `framer-motion`
- **Interactive UI** with services listing, plans, and smooth navigation
- **Service Plans**: Standard, Custom, Premium – selectable based on user requirements
- **Inquiry Form**: Name, email, phone, topic, and project description
- **Payment Integration** with **Stripe** and **Razorpay**
- **Chat System** (Socket.io): Enabled after successful payment for direct admin communication
- **Pages**: Home, Services, Pricing, Connect, FAQ, About, and Footer – all fully responsive

### ✅ Admin Panel
- **Inquiries Dashboard**: View all user inquiries with real-time payment status (Paid, Unpaid, Pending)
- **Chat Interface**: Real-time chat with paid clients, with a sidebar showing all users
- **Product Plan Management**: Add/Edit/Delete service plans, pricing, and descriptions

---

## 🛠 Tech Stack

### 🚀 Frontend (User)
- React `^19.1.0`
- Tailwind CSS `^4.1.8`
- React Router DOM `^7.6.2`
- React Toastify, Slick Carousel, Framer Motion
- Stripe.js, Razorpay, Socket.IO Client
- OTP Verification via Nodemailer

### 🛡 Backend
- Node.js + Express `^5.1.0`
- MongoDB with Mongoose `^8.15.2`
- JWT Authentication
- OTP via Nodemailer
- Stripe & Razorpay Payment Integration
- Cloudinary for media handling
- Multer, Validator

### 🧑‍💼 Admin Panel
- React `^19.1.0`
- Tailwind CSS `^4.1.10`
- React Toastify, HeroIcons, Tsparticles
- Axios & Socket.IO Client

---

## 📦 Folder Structure

DoddleSync/
├── frontend/ # User interface (React)
├── backend/ # API and server logic (Node.js + Express)
├── admin/ # Admin panel (React)

