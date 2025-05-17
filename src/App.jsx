import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Menu from './components/dashboard/menu';
import ProtectedRoute from './components/protected.route'; // adjust path
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
    <ToastContainer position="top-center" />
    </>
  );
}

export default App;
