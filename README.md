# ⚛️ Task Tracker Frontend

LINK TO TASKTRACKER APP-https://task-tracker-frontend-chi.vercel.app/



This is the **frontend** of the Task Tracker App, built with:

- [Vite](https://vitejs.dev/) (super-fast React tooling)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React Router](https://reactrouter.com/) for routing
- [Axios](https://axios-http.com/) for API requests
- [Toast](https://www.npmjs.com/package/react-toastify?activeTab=readme) for Notifications

-----------------------------------------------------------------------------------------------------

## 📸 Features


- 🔐 **JWT Authentication** (signup, login, logout)
- 🧠 Auth state managed globally with Redux Toolkit
- 🛡️ Protected routes (accessible only if logged in)
- 📁 Create and manage multiple projects
- ✅ Add, update, delete, and complete tasks per project
- ♻️ Auto-refresh projects and tasks via backend API
- 🌐 Works with a Node.js + MongoDB backend
- ♻️ Live task updates per project
- 🛎️ Toast notifications for success/error feedback

-----------------------------------------------------------------------------------------------------------

## 🛠️ Setup Instructions

### 🔹 Prerequisites

- Node.js & npm
- Backend API running (https://github.com/nishu65/task-tracker-backend)
***************************************************************************************************************
### 🔹 Install and Run

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

```

🔐 Environment Variables

Create a .env file in the frontend/ directory:


env


VITE_API_URL= "your backend url" e.g(http://localhost:5000/api)
