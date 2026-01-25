import React from "react";

interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function GameButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: GameButtonProps) {
  const baseClasses =
    "relative font-semibold cursor-pointer transition-all duration-200 active:scale-95 overflow-hidden";

  const variantClasses = {
    primary:
      "px-6 py-3 bg-slate-700 text-white border border-blue-500/60 hover:border-blue-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-blue-500/30 rounded-lg",
    secondary:
      "px-6 py-3 bg-slate-700 text-white border border-cyan-500/60 hover:border-cyan-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-cyan-500/30 rounded-lg",
    danger:
      "px-6 py-3 bg-slate-700 text-white border border-red-500/60 hover:border-red-400 hover:bg-slate-600 hover:shadow-lg hover:shadow-red-500/30 rounded-lg",
  };

  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
