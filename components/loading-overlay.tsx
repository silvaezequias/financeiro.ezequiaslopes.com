"use client";

import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({
  isVisible,
  message = "Carregando...",
  className,
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        " backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center bg-neutral-950 border-amber-300 border gap-4 p-8 rounded-xl shadow-lg">
        <div className="relative">
          <div className="w-16 h-16 border-4  rounded-full border-amber-300 animate-spin border-t-primary"></div>
        </div>

        <p className="text-lg font-medium text-neutral-200 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
