import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import PremiumContent from './components/PremiumContent'
import ProtectedRoute from './routes/ProtectedRoutes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />}>Home</Route>
            <Route path="register" element={<Register />}>Register</Route>
            <Route path="login" element={<Login />}>Login</Route>

            <Route
              path='/premium-content'
              element={<ProtectedRoute>
                <PremiumContent />
              </ProtectedRoute>}>

            </Route>
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
