import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Menu from './components/dashboard/menu';
import ProtectedRoute from './components/protected.route'; // adjust path

function App() {
  return (
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
  );
}

export default App;
