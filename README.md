# 🚀 Mini-SaaS Task Manager (Frontend)

This is the frontend client for a full-stack, secure task management application designed to demonstrate real-world development skills, including token-based authentication, protected routing, and responsive design.

The architecture is explicitly decoupled into separate frontend and backend repositories to adhere to industry-standard CI/CD and deployment practices.

### 🔗 Project Links
* **Live Application: **[https://saas-frontend-gamma-ten.vercel.app/]
* **Backend Repository:** [https://github.com/Nikhilgone517/saas_backend]

---

## 💻 Tech Stack
* **Core:** React.js (Bootstrapped with Vite for optimized build times)
* **Styling:** Tailwind CSS (Utility-first, responsive design)
* **Routing:** React Router DOM (Client-side routing and protected routes)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **API Communication:** Native `fetch` API with JWT Bearer tokens

---

## ✨ Key Features
* **Stateless Authentication:** Handles JWT tokens securely via `localStorage` to persist user sessions.
* **Protected Routes:** Implements a custom `<ProtectedRoute />` wrapper that prevents unauthenticated users from accessing the dashboard.
* **Dynamic UI Updates:** Optimistically updates the user interface during CRUD operations (Create, Read, Update, Delete) for a snappy user experience.
* **Responsive Layout:** Clean, accessible interface built with Tailwind CSS that scales perfectly from mobile devices to large desktop monitors.

---

## 🧠 Engineering Decisions & Highlights

As a developer, I prioritize maintainability and user experience. Here are a few key decisions made during this frontend build:

1. **Vite over Create-React-App:** I opted for Vite due to its significantly faster Hot Module Replacement (HMR) and optimized production builds compared to traditional Webpack-based bundlers.
2. **Decoupled Architecture:** By separating the frontend from the backend, this application mimics real-world microservice environments. This allows the frontend to be hosted on an edge network (Vercel) for maximum speed.
3. **Tailwind for Scalability:** Instead of managing large, sprawling `.css` files, Tailwind allowed me to build custom, reusable components directly in the JSX, ensuring consistent design patterns and zero dead CSS.

---

## 🛠️ Local Installation & Setup

To run this frontend locally:

1. **Clone the repository:**
   ```bash
   git clone [Paste Your Frontend Repo URL]
   cd saas-frontend
2. ** Install dependencies:**
   ```bash
   npm install
3. Configure the Environment:
Ensure the API fetch URLs in Login.jsx, Register.jsx, and Dashboard.jsx are pointing to your local or live backend URL.
4. ** Start the development server:
   ```bash
   npm run dev
   
