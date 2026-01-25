export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-950/5 rounded-full blur-3xl"></div>
      </div>

      {/* Spinner */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
        <p className="text-cyan-200 text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
