import { Briefcase, MapPin, DollarSign, ArrowRight } from "lucide-react";

export function CareersPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-20 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
            Join Our Team
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)]">
            We're building the future of AI-assisted learning. Come build it with us.
          </p>
        </div>

        {/* Open Positions List */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold border-b border-[var(--color-border)] pb-2 mb-4">
            Open Positions
          </h2>

          {/* Job Card: Frontend Developer */}
          <div className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-emerald-500/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Job Info */}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-[var(--color-text)] group-hover:text-emerald-400 transition-colors">
                  Frontend Developer
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-muted)] text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> Full-Time
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Remote / Hybrid
                  </span>
                  <span className="flex items-center gap-1 font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <DollarSign className="w-4 h-4" /> $20,000 / year
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95 whitespace-nowrap">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Description Preview */}
            <p className="mt-6 text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-2xl">
              We are looking for a passionate Frontend Developer to help us craft premium, dynamic user experiences. You will be working primarily with React, TypeScript, and Tailwind CSS to build aesthetic interfaces that "wow" our users.
            </p>
          </div>
          
          {/* No More Positions State */}
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <p>Don't see a role that fits? Check back later or send us your resume!</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
