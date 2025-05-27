import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import BrandingHeader from '../components/Header';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          firstName,
          lastName,
          dob,
          email,
        });
  
        console.log('Success!');
        alert('Account created! Please log in to continue.');
        navigate('/login');
  
      } catch (firestoreError) {
        console.error('❌ Firestore Error:', firestoreError);
        alert('Account created, but saving profile failed.');
      }
  
    } catch (authError) {
      console.error('❌ Auth Error:', authError);
      alert('Sign up failed. Please try again.');
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <BrandingHeader />

        <form
          onSubmit={handleSignup}
          className="bg-white p-6 rounded-lg shadow-xl space-y-4"
        >
          <input
            type="text"
            placeholder="First Name"
            className="w-full border border-gray-300 p-3 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border border-gray-300 p-3 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            className="w-full border border-gray-300 p-3 rounded"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
