import React, { PropsWithChildren } from 'react';

export function Sparkles({ children }: PropsWithChildren) {
  return (
    <span className="relative inline-flex items-center">
      {children}
      {/* subtle sparkle accents */}
      <span className="pointer-events-none absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-pink-400"></span>
      <span className="pointer-events-none absolute -top-2 -right-2 w-2 h-2 rounded-full bg-pink-400/50 blur-[2px] animate-ping"></span>
      <span className="pointer-events-none absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-amber-300"></span>
      <span className="pointer-events-none absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-amber-300/50 blur-[2px] animate-ping"></span>
    </span>
  );
}
