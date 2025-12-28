# 🚗 Rent Wheels — Car Rental Platform

A modern, responsive car rental web application built with **React**, **Vite**, **Firebase**, and **Tailwind CSS**. Users can browse, book, list, and manage cars with a clean, intuitive interface and secure authentication.

---

## ✨ Features

### 🔐 Authentication
- **Email/Password** registration and login
- **Google Sign-In** integration (Firebase)
- **Protected routes** with PrivateRoute component
- Secure session management with Firebase Auth

### 🚘 Car Management
- **Add new cars** with images, description, and availability status
- **View personal listings** (My Listing)
- **Update car details** and availability status
- **Delete cars** with confirmation prompts
- Browse and filter cars by availability

### 📅 Booking System
- **Search and browse** available cars
- **Book cars** with instant confirmation
- **View all bookings** in My Bookings section
- **Cancel bookings** with confirmation
- Real-time booking status updates

### 🎨 User Interface
- **Fully responsive design** (mobile, tablet, desktop)
- **Modern, clean components**:
  - Responsive Navigation Bar
  - Hero Banner
  - Car Details view
  - Customer Testimonials carousel
  - Top Rated Cars section
  - Why Rent With Us section
  - Footer
- Built with **Tailwind CSS** and **DaisyUI**

### 📱 Additional Features
- Real-time car availability
- User-specific listings and bookings
- Toast notifications for user actions
- Error handling and validation

---

## 🛠 Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.2 - Build tool and dev server
- **React Router** 7.9.5 - Client-side routing
- **Tailwind CSS** 4.1.17 - Utility-first CSS framework
- **DaisyUI** 5.5.0 - Component library

### State & Auth
- **Firebase** 12.5.0 - Authentication and backend integration

### UI Components
- **Swiper** 12.0.3 - Carousel/slider component
- **React Responsive Carousel** 3.2.23 - Carousel functionality
- **Embla Carousel** 8.6.0 - Alternative carousel library
- **React Icons** 5.5.0 - Icon library
- **SweetAlert2** 11.26.3 - Beautiful alert modals

### Development
- **ESLint** 9.39.1 - Code linting
- **Vite React Plugin** 5.1.0 - React integration for Vite

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AddCar/              # Form to add new cars
│   ├── Banner/              # Hero banner section
│   ├── BrowseCars/          # Car listing and search
│   ├── CarDetails/          # Individual car details view
│   ├── CustomerTestimonials/# Testimonials carousel
│   ├── Footer/              # Footer section
│   ├── MyBookings/          # User's bookings management
│   ├── MyListing/           # User's car listings
│   ├── NavBar/              # Navigation bar
│   ├── PrivateRoute/        # Route protection component
│   ├── TopRatedCars/        # Featured cars section
│   └── WhyRentUs/           # Why choose us section
├── contexts/
│   ├── AuthContext.jsx      # Auth context setup
│   └── AuthProvider.jsx     # Auth context provider
├── firebase/
│   └── firebase.config.js   # Firebase configuration
├── layouts/
│   ├── AuthLayout/          # Layout for auth pages
│   └── RootLayout/          # Main app layout
├── pages/
│   ├── HomePage.jsx         # Landing page
│   ├── LoginPage.jsx        # Login page
│   ├── RegisterPage.jsx     # Registration page
│   └── ErrorPage.jsx        # 404 error page
├── router/
│   └── router.jsx           # Route configuration
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
├── App.css                  # Global styles
└── index.css                # Base styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jihanurrahman33/rent_wheels-client.git
   cd rent_wheels-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
     ```
     VITE_API_KEY=your_api_key
     VITE_AUTH_DOMAIN=your_auth_domain
     VITE_PROJECT_ID=your_project_id
     VITE_STORAGE_BUCKET=your_storage_bucket
     VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_APP_ID=your_app_id
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🔗 Key Components

### Authentication Flow
- Users register/login via Firebase
- Auth state managed through AuthContext
- Protected routes ensure only authenticated users access certain pages
- User email linked to their listings and bookings

### Booking Process
1. Browse available cars
2. Click on a car to view details
3. Click "Book Now" to reserve
4. Manage bookings in "My Bookings"
5. Cancel bookings as needed

### Car Listing Process
1. Navigate to "Add Car"
2. Fill in car details (make, model, price, images, etc.)
3. Car appears in personal "My Listing"
4. Update availability status
5. Delete car when no longer available

---

## 🎯 Future Enhancements

- Payment integration (Stripe/PayPal)
- Advanced search and filtering
- Review and rating system
- Email notifications
- Analytics dashboard
- Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Jihan ur Rahman**
- GitHub: [@jihanurrahman33](https://github.com/jihanurrahman33)

---

## 📧 Contact

For questions or support, feel free to reach out through GitHub issues or email.

---

**Happy Renting! 🚗💨**

Extra Sections (Trending Cars, Safety Features, etc.)

Dark mode support

Animated modals for profile info

Styled car cards + gradients + hover effects

📦 Backend (Node + Express + MongoDB)

Secure CRUD APIs

JWT middleware

Car listing routes

Booking routes

Update status & remove booking routes

Pagination-ready car fetching
📁 Tech Stack
Frontend

React + React Router

Tailwind CSS + DaisyUI

SweetAlert2

Firebase Auth

Custom Reusable Components

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Auth

Middleware validation