import './App.css';
import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import IntroScreen from './pages/Dashboard';
import MapScreen from './pages/MapScreen';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Protected dashboard routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<IntroScreen />} />
        <Route path="/dashboard/map" element={<MapScreen />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}