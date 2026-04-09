export const sharedStyles = {
  layout: "min-h-screen bg-zinc-950 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.15),transparent_40%)] text-zinc-50 font-sans flex flex-col",
  header: "flex justify-between items-center px-8 py-5 border-b border-white/5 backdrop-blur-md",
  logo: "text-2xl font-extrabold tracking-tighter bg-gradient-to-br from-emerald-400 via-blue-500 to-emerald-500 bg-[length:300%_100%] text-transparent bg-clip-text transition-all duration-400 hover:bg-[100%_0] hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.5)] active:scale-95 active:translate-y-px inline-block",
  nav: "flex items-center gap-6",
  navBtn: "px-5 py-2 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-[length:300%_100%] text-white text-sm font-semibold rounded-md transition-all duration-400 hover:bg-[100%_0] hover:shadow-[0_6px_16px_-4px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-px active:scale-95 active:shadow-[0_2px_8px_-2px_rgba(16,185,129,0.5)]",
  main: "flex-1 flex justify-center items-center p-8",
  
  card: "bg-zinc-900/50 backdrop-blur-xl p-12 rounded-2xl border border-white/10 w-full max-w-[420px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-slideUp",
  cardHeader: "text-center mb-10",
  cardTitle: "text-3xl font-bold text-zinc-50 mb-2 tracking-tight",
  cardSubtitle: "text-zinc-400 text-[15px]",
  
  formGroup: "mb-5 text-left",
  label: "block mb-2 text-sm font-medium text-zinc-200",
  labelSp: "text-zinc-500 font-normal",
  input: "w-full px-4 py-3.5 rounded-lg bg-black/20 border border-white/10 text-zinc-50 text-base transition-all duration-200 focus:outline-none focus:border-emerald-400 focus:bg-black/40 focus:ring-[3px] focus:ring-emerald-400/15 placeholder:text-zinc-500 line-height-normal",
  
  submitBtn: "w-full mt-4 px-4 py-3.5 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-[length:300%_100%] text-white text-base font-semibold rounded-lg transition-all duration-400 hover:bg-[100%_0] hover:shadow-[0_8px_24px_-6px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98] active:shadow-[0_4px_12px_-3px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed",
  
  error: "text-red-500 text-sm mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center",
  
  linkText: "text-center mt-6 text-sm text-zinc-400",
  link: "text-emerald-400 font-medium hover:underline",
};
