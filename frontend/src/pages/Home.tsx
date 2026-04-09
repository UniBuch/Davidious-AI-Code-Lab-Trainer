import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans p-8 box-border">
      <header className="flex justify-between items-center pb-8 border-b border-white/10 mb-8 mt-4 mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">Davidious AI Lab</h1>
        <div className="flex items-center gap-6">
          <span className="text-lg font-medium text-zinc-400">Hello, <span className="text-zinc-100">{user?.name || user?.email}</span></span>
          <button
            className="px-5 py-2.5 bg-transparent text-red-500 border border-red-500/30 rounded-lg font-semibold tracking-wide transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-95"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="bg-zinc-900/50 border border-white/10 rounded-2xl p-16 text-center backdrop-blur-xl shadow-2xl shadow-black/50 max-w-3xl mx-auto mt-12 animate-slideUp">
        <h2 className="text-3xl font-semibold text-white mb-6">Welcome to your Sandbox workspace</h2>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
          You are successfully authenticated. You're ready to start your AI-driven coding tasks
          and track your progress in real-time.
        </p>
      </main>
    </div>
  );
};
