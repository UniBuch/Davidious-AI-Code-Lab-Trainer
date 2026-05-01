export const sharedStyles = {
  layout: "min-h-screen font-sans flex flex-col",
  header: "flex justify-between items-center px-8 py-5 backdrop-blur-md",
  logo: "text-2xl font-extrabold tracking-tighter bg-gradient-to-br from-emerald-400 via-blue-500 to-emerald-500 bg-[length:300%_100%] text-transparent bg-clip-text transition-all duration-400 hover:bg-[100%_0] hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.5)] active:scale-95 active:translate-y-px inline-block",
  nav: "flex items-center gap-6",
  navBtn: "px-5 py-2 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-[length:300%_100%] text-white text-sm font-semibold rounded-md transition-all duration-400 hover:bg-[100%_0] hover:shadow-[0_6px_16px_-4px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-px active:scale-95 active:shadow-[0_2px_8px_-2px_rgba(16,185,129,0.5)]",
  main: "flex-1 flex justify-center items-center p-8",

  card: "auth-card backdrop-blur-xl p-12 rounded-2xl w-full max-w-[420px] animate-slideUp",
  cardHeader: "text-center mb-10",
  cardTitle: "text-3xl font-bold mb-2 tracking-tight",
  cardSubtitle: "theme-subtitle text-[15px]",

  formGroup: "mb-5 text-left",
  label: "theme-label block mb-2 text-sm font-medium",
  labelSp: "theme-label-sp font-normal",
  input: "theme-input w-full px-4 py-3.5 rounded-lg text-base focus:outline-none focus:ring-[3px] focus:ring-emerald-400/15 leading-normal",

  submitBtn: "w-full mt-4 px-4 py-3.5 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-[length:300%_100%] text-white text-base font-semibold rounded-lg transition-all duration-400 hover:bg-[100%_0] hover:shadow-[0_8px_24px_-6px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 active:translate-y-px active:scale-[0.98] active:shadow-[0_4px_12px_-3px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed",

  error: "text-red-500 text-sm mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center",

  linkText: "theme-link-text text-center mt-6 text-sm",
  link: "text-emerald-400 font-medium hover:underline",
};
