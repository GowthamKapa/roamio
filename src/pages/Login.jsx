import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import BrandingHeader from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Check credentials.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <BrandingHeader />
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-xl space-y-4"
        >
          <div className="flex flex-col space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-lg"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600">
          New here?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
