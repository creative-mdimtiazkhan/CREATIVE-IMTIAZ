import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginState } = useAppContext();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (email === 'creative.mdimtiazkhan@gmail.com' && password === '896388') {
      loginState(true);
      navigate('/admin/profile');
    } else {
      // Simulate normal user login for non-admin credentials
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-5 relative">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 hover:text-[#00aaff] transition flex items-center gap-2 text-zinc-400">
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-md">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#00aaff]">Login</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4 mb-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#00aaff] focus:outline-none transition text-white" 
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#00aaff] focus:outline-none transition text-white" 
                placeholder="Enter your password"
              />
            </div>
            
            <button type="submit" className="w-full bg-[#00aaff] hover:bg-[#0088cc] text-white font-bold py-3 mt-2 rounded-xl transition">
              Login
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-zinc-800 w-full"></div>
            <div className="absolute bg-zinc-900 px-3 text-sm text-zinc-500">OR</div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 bg-[#db4437] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition">
              <span>Login with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-[#1877f2] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition">
              <span>Login with Facebook</span>
            </button>
          </div>

          <p className="text-center mt-6 text-zinc-400 text-sm">
            Don't have an account? <Link to="/signup" className="text-[#00aaff] hover:text-[#0088cc] font-semibold transition">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
