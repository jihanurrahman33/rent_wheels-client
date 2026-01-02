# 🦅 Rent Wheels — Executive Fleet Protocol

> **"Performance, comfort, and style—ready for your command."**

### 🟢 **[Live Access: Enter Protocol](https://glowing-gingersnap-8e4581.netlify.app/)**

**Rent Wheels** is a state-of-the-art vehicle reservation platform designed for the discerning traveler. Built with a "luxury-first" philosophy, it combines immersive glassmorphism aesthetics with robust functionality to deliver a premium user experience.

---

## ✨ The Executive Experience

### 🔐 Elite Access (Authentication)
- **Secure Entry**: Powered by **Firebase Auth**, supporting both email credentials and Google Sign-In.
- **Session Continuity**: Persistent login states ensure smooth re-entry.
- **Protected Protocol**: Sensitive routes are guarded by a dedicated `PrivateRoute` system.

### 🏎️ Fleet Command (Car Management)
- **Inventory Control**: Add premium vehicles to the listings with high-res imagery and detailed specs.
- **My Listing Dashboard**: Manage your personal fleet; update availability or decommission vehicles (delete) with a single click.
- **Status Indicators**: Real-time visual cues for "Available" vs "Unavailable" assets.

### 📅 Reservation Systems
- **Concierge Booking**: detailed "Book Now" flow with instant confirmation modals.
- **My Bookings Ledger**: A dedicated history of all your active and past reservations.
- **Calendar & Pricing**: Transparent daily rates with zero hidden fees.

### 🧭 Exploration & Discovery
- **Smart Pagination**: Browse the extensive fleet with our custom-built pagination engine (8 vehicles per view).
- **Intelligent Recommendations**: The *Car Details* interface suggests 3 similar vehicles from the same category (e.g., "SUV" or "Luxury"), ensuring you always find the perfect match.
- **Advanced Filtering**: Sort by Price (Low/High), Date Added, or Rating. Search instantly by Model, Brand, or Keywords.

### 👤 Profile Bureau
- **Identity Management**: A dedicated **Profile Page** to manage your digital persona.
- **Live Updates**: Update your Display Name and Profile Photo URL with immediate reflection across the UI.
- **Visual Analytics**: Quick-glance stats for your total Bookings and Listings.

---

## 🎨 Aesthetic & Design Language

The interface is crafted using **Tailwind CSS** and **DaisyUI**, featuring a "Glassmorphism" design system:
- **Immersive Backgrounds**: Dynamic, glowing gradients that shift with the theme.
- **Frosted Glass Cards**: Content floats on semi-transparent, blurred layers (`backdrop-blur-xl`).
- **Micro-Interactions**: Smooth hover states, button scaling, and transition effects.
- **Responsive Geometry**: Layouts that adapt fluidly from desktop command centers to mobile devices.

---

## 🛠️ Technical Architecture

### Frontend Core
- **React 19** & **Vite**: Ultra-fast rendering and build tooling.
- **React Router 7**: Client-side routing with optimized data loaders.

### Styling & UI
- **Tailwind CSS 4**: The latest engine for utility-first styling.
- **DaisyUI 5**: Premium component primitives.
- **Framer Motion / Animations**: CSS-based glow effects and transitions.
- **React Icons**: Iconography for a polished look.
- **SweetAlert2**: Beautiful, animated alert modals for user feedback.

### Backend Services
- **Firebase**: Authentication, Identity, and Hosting.
- **Node.js / Express**: (Backend API context) RESTful services for car data and booking logic.
- **MongoDB**: (Database context) Validated schema and persistent storage.

---

## 🚀 Deployment Protocol (Local)

Follow these steps to initialize the Rent Wheels client on your local machine.

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A Firebase Project (for Auth config)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jihanurrahman33/rent_wheels-client.git
   cd rent_wheels-client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and inject your Firebase credentials:
   ```env
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_auth_domain
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_APP_ID=your_app_id
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   > Access the terminal at `http://localhost:5173`

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── BrowseCars/          # Pagination & Filter Logic
│   ├── CarDetails/          # Booking & Recommendations Logic
│   ├── NavBar/              # Responsive Navigation
│   └── ...
├── pages/
│   ├── ProfilePage.jsx      # User Profile Management
│   ├── HomePage.jsx         # Landing Experience
│   └── ...
├── contexts/
│   └── AuthContext.jsx      # Authentication State
├── router/
│   └── router.jsx           # Application Routes
└── main.jsx                 # Entry Point
```

---

## 🤝 Contribution

Clearance granted for contributions. Fork the repository, engineer your feature branch, and submit a Pull Request for review.

---

**Rent Wheels** — *Elevating the Standard of Travel.*