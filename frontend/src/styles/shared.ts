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

  // Page container
  page: "max-w-4xl mx-auto px-8 py-10 pb-16 animate-[fadeIn_0.4s_ease-out]",
  pageHeader: "flex items-center justify-between gap-4 mb-2",
  pageTitle: "m-0 text-3xl font-extrabold tracking-tight bg-gradient-to-br from-emerald-400 to-blue-400 bg-clip-text text-transparent",
  muted: "text-zinc-400 text-sm leading-relaxed",

  // Buttons
  btnPrimary: "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(16,185,129,0.55)] active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  btnSm: "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-zinc-400 bg-zinc-900/50 border border-white/10 rounded-md cursor-pointer transition-all duration-200 hover:text-white hover:bg-white/5 hover:border-emerald-400/35",
  btnDanger: "text-red-400 border-red-500/25 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold bg-zinc-900/50 border rounded-md cursor-pointer transition-all duration-200",
  btnToggleAdd: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-emerald-400 bg-transparent border border-emerald-400/25 rounded-lg cursor-pointer transition-all duration-200 hover:bg-emerald-400/10 hover:border-emerald-400/50",
  btnAddUrl: "inline-flex items-center gap-1 mt-2 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-transparent border border-dashed border-emerald-400/30 rounded-md cursor-pointer transition-all duration-200 hover:bg-emerald-400/10 hover:border-emerald-400/50",
  btnSubmit: "w-full p-3.5 text-base mt-2 inline-flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_-4px_rgba(16,185,129,0.55)] active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",

  // Messages & empty state
  message: "p-3.5 rounded-xl text-sm font-medium mb-5",
  messageErr: "p-3.5 rounded-xl text-sm font-medium mb-5 bg-red-500/10 text-red-400 border border-red-500/25",
  emptyState: "text-center py-12 px-4 text-zinc-400",
  emptyIcon: "text-5xl mb-4 grayscale-[0.3]",

  // Create Path
  cpPageTitle: "text-3xl font-extrabold tracking-tight bg-gradient-to-br from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1",
  cpSection: "bg-zinc-900/50 border border-white/10 rounded-xl p-6 mb-6 backdrop-blur-xl transition-colors duration-250 hover:border-emerald-400/20",
  cpSectionTitle: "text-lg font-bold m-0 mb-4 text-zinc-100",
  optional: "font-normal text-xs text-zinc-500",
  required: "text-red-400",
  cpLabel: "block text-sm font-semibold text-zinc-400 mb-4",
  cpHint: "text-xs text-zinc-500 mt-1.5",
  accent: "text-emerald-400",

  // Forms & Inputs
  cpInput: "block w-full mt-1.5 px-3.5 py-2.5 text-sm text-zinc-100 bg-zinc-950/50 border border-white/10 rounded-lg outline-none transition-all duration-200 focus:bg-zinc-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15 placeholder-zinc-600 font-sans resize-y",
  hoursRow: "flex items-center gap-3 mt-2",
  hoursBound: "text-xs text-zinc-500 whitespace-nowrap min-w-[3rem]",
  hoursSlider: "flex-1 appearance-none h-1.5 rounded-full bg-white/10 outline-none cursor-pointer accent-emerald-400 hover:accent-emerald-300",

  // File drop & lists
  fileDropArea: "flex flex-col items-center justify-center gap-1.5 p-6 border-2 border-dashed border-white/10 rounded-xl cursor-pointer text-zinc-500 text-sm transition-all duration-250 hover:border-emerald-400/40 hover:bg-emerald-400/5",
  fileDropSm: "p-4",
  fileDropIcon: "text-2xl",
  fileList: "list-none p-0 mt-3",
  fileItem: "flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-zinc-900 mb-1.5 text-xs",
  fileName: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-zinc-200",
  fileSize: "text-zinc-500 text-xs",
  fileRemove: "bg-transparent border-none text-zinc-500 cursor-pointer text-sm px-1.5 py-0.5 rounded transition-all duration-150 hover:text-red-400 hover:bg-red-500/10",

  // URLs
  urlList: "flex flex-col gap-2",
  urlRow: "flex gap-2",
  urlRemove: "bg-transparent border border-white/10 text-zinc-500 cursor-pointer text-sm px-2.5 py-1.5 rounded-lg transition-all duration-150 hover:text-red-400 hover:border-red-500/35 hover:bg-red-500/10",

  // Progress
  progressPanel: "flex flex-col items-center gap-5 py-12 px-6 text-center",
  progressSpinner: "w-11 h-11 border-4 border-white/10 border-t-emerald-400 rounded-full animate-spin",
  progressLog: "list-none p-0 m-0 text-left text-sm leading-loose text-zinc-400 max-w-md",

  // PathList
  pathList: "list-none p-0 mt-5 flex flex-col gap-3",
  pathCard: "flex flex-col sm:flex-row items-stretch bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl transition-all duration-250 hover:border-emerald-400/25 hover:shadow-lg hover:-translate-y-0.5",
  pathCardMain: "flex-1 p-5 min-w-0",
  pathCardTop: "flex items-center gap-2.5 mb-1.5",
  pathCardTitle: "text-lg font-bold text-zinc-100 no-underline transition-colors duration-200 hover:text-emerald-400",
  pathDescription: "text-sm text-zinc-400 my-1 leading-relaxed line-clamp-2",
  pathMeta: "flex flex-wrap gap-3 text-xs text-zinc-500",
  docDate: "sm:ml-auto",
  pathCardActions: "flex flex-row sm:flex-col justify-center gap-2 p-3 sm:p-4 border-t sm:border-t-0 sm:border-l border-white/10",

  // Badges
  statusBadge: "inline-flex items-center px-2 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-wider",
  badgeProcessing: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25",
  badgeReady: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  badgeError: "bg-red-500/10 text-red-400 border border-red-500/25",

  // PathDetail
  pathDetailPage: "max-w-4xl mx-auto px-8 py-10 pb-16 animate-[fadeIn_0.4s_ease-out]",
  pathDetailHeader: "mb-6",
  backLink: "text-sm font-semibold text-zinc-500 no-underline transition-colors duration-200 hover:text-emerald-400",
  pathDetailTitle: "text-3xl font-extrabold tracking-tight my-2 bg-gradient-to-br from-emerald-400 to-blue-400 bg-clip-text text-transparent",
  pathDetailMeta: "flex gap-4 text-sm text-zinc-500 mt-2",

  processingBanner: "flex items-start gap-4 p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 mb-6 text-sm text-zinc-400",
  processingBannerStrong: "text-yellow-400 block mb-1",
  processingBannerP: "m-0 leading-relaxed",
  spinnerSm: "w-5 h-5 shrink-0 border-2 border-white/10 border-t-yellow-400 rounded-full animate-spin mt-0.5",

  sectionTitle: "text-xl font-bold mb-4",
  dayTimeline: "flex flex-col gap-3 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:to-white/10 before:rounded-full",
  dayCard: "flex items-start gap-3.5 relative animate-[fadeIn_0.35s_ease-out_both] before:content-[''] before:absolute before:-left-6 before:top-3.5 before:w-2.5 before:h-2.5 before:rounded-full before:bg-emerald-400 before:border-2 before:border-zinc-950 before:ring-2 before:ring-emerald-400/30 before:-translate-x-1",
  dayNumber: "text-[11px] font-bold text-emerald-400 uppercase tracking-widest min-w-[3.5rem] pt-2",
  dayBody: "flex-1 bg-zinc-900/50 border border-white/10 rounded-xl p-3.5 px-4 backdrop-blur-xl transition-colors duration-200 hover:border-emerald-400/20",
  dayTitle: "text-base font-semibold text-zinc-100 m-0 mb-1",
  dayDescription: "text-sm text-zinc-400 m-0 mb-2 leading-relaxed",
  dayMeta: "flex gap-3 text-xs text-zinc-500",

  addSourceSection: "mt-8 pt-6 border-t border-white/10",
  addSourceForm: "mt-4 bg-zinc-900/50 border border-white/10 rounded-xl p-5 backdrop-blur-xl",
  addSourceRow: "flex flex-col sm:flex-row gap-5",
  addSourceMsg: "my-3 p-3 text-xs bg-zinc-950/50 rounded-lg text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed",
};
