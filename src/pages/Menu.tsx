import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-5">
      <div className="flex items-center mb-10">
        <button onClick={() => navigate(-1)} className="mr-4 hover:text-[#00aaff] transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Menu</h1>
      </div>

      <div className="flex flex-col gap-8 max-w-md mx-auto">
        {/* Auth Section */}
        <div className="flex flex-col gap-4 bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-sm text-zinc-400 uppercase tracking-wider font-semibold mb-2">Account</h2>
          <Link to="/login" className="w-full bg-[#00aaff] hover:bg-[#0088cc] text-white font-bold py-3 px-4 rounded-xl text-center transition">
            Login
          </Link>
          <Link to="/signup" className="w-full border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl text-center transition">
            Signup
          </Link>
        </div>

        {/* Social Login Section */}
        <div className="flex flex-col gap-4 bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-sm text-zinc-400 uppercase tracking-wider font-semibold mb-2">Social Login</h2>
          <button className="w-full bg-[#db4437] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl text-center transition">
            Login with Google
          </button>
          <button className="w-full bg-[#1877f2] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl text-center transition">
            Login with Facebook
          </button>
        </div>

        {/* Admin Link Section */}
        <div className="flex flex-col mt-4">
          <Link to="/admin/login" className="text-zinc-500 text-sm hover:text-white transition text-center underline">
            Admin Dashboard Login
          </Link>
        </div>
      </div>
    </div>
  );
}
