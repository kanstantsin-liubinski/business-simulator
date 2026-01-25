import Link from "next/link";
import React from "react";

interface GameLinkProps {
  href: string;
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export default function GameLink({
  href,
  variant = "primary",
  children,
}: GameLinkProps) {
  const variantClasses = {
    primary:
      "px-6 py-3 bg-slate-700 text-white border border-blue-500/60 hover:border-blue-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-blue-500/30 rounded-lg",
    secondary:
      "px-6 py-3 bg-slate-700 text-white border border-cyan-500/60 hover:border-cyan-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-cyan-500/30 rounded-lg",
    danger:
      "px-6 py-3 bg-slate-700 text-white border border-red-500/60 hover:border-red-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-red-500/30 rounded-lg",
  };

  return (
    <Link
      href={href}
      className={`relative font-semibold transition-all duration-200 active:scale-95 overflow-hidden inline-block ${variantClasses[variant]}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Link>
  );
}
