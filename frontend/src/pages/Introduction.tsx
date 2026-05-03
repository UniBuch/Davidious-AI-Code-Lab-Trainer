import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const IntroductionPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden flex-1 py-12 px-4">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen animate-pulse delay-700" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] backdrop-blur-md shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">
              Next-Gen Learning Platform
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Welcome to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-500 bg-[length:200%_auto] animate-gradient">
              AI Code Lab Trainer
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Experience a state-of-the-art sandbox environment designed to accelerate your development skills through intelligent, interactive training and real-time AI feedback.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl font-bold text-white text-lg tracking-wide hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 text-center"
                >
                  Start For Free
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl font-bold text-[var(--color-text)] text-lg tracking-wide hover:bg-[var(--color-bg-hover)] transition-all duration-300 text-center"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl font-bold text-white text-lg tracking-wide hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 text-center"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Hero Image with Glassmorphism */}
        <div className="flex-1 w-full max-w-2xl lg:max-w-none relative group perspective-1000">
          <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-2xl shadow-black/20 transform rotate-y-[-5deg] rotate-x-[5deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out bg-[var(--color-bg-surface)] backdrop-blur-xl">
            {/* The Hero Image */}
            <img 
              src="/images/ai_coding_hero.png" 
              alt="AI Coding Lab Interface" 
              className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* Overlay for integration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg)] via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />
          </div>
          
          {/* Floating UI Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

      </div>
    </div>
  );
};
