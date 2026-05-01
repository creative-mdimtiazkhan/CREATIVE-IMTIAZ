import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-5 relative">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 hover:text-[#00aaff] transition flex items-center gap-2 text-zinc-400">
        <ArrowLeft size={24} />
      </button>

      <div className="w-full max-w-md my-8">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#00aaff]">Signup</h1>
          
          <form className="flex flex-col gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#00aaff] focus:outline-none transition text-white" 
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#00aaff] focus:outline-none transition text-white" 
                placeholder="+880 1xxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#00aaff] focus:outline-none transition text-white" 
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#00aaff] focus:outline-none transition text-white" 
                placeholder="Create a password"
              />
            </div>
            
            <button type="button" className="w-full bg-[#00aaff] hover:bg-[#0088cc] text-white font-bold py-3 mt-2 rounded-xl transition">
              Signup
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-zinc-800 w-full"></div>
            <div className="absolute bg-zinc-900 px-3 text-sm text-zinc-500">OR</div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl transition">
              <span>Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl transition">
              <span>Continue with Facebook</span>
            </button>
          </div>

          <p className="text-center mt-6 text-zinc-400 text-sm">
            Already have an account? <Link to="/login" className="text-[#00aaff] hover:text-[#0088cc] font-semibold transition">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
