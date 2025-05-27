import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function PrivateRoute() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-medium text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (error) {
    console.error('Firebase Auth Error:', error);
    return <div className="text-red-500">Auth error. Please refresh.</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}