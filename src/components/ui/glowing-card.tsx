"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: string;
  borderGradient?: string;
  blur?: number;
  children: React.ReactNode;
}

export function GlowingCard({
  gradient = "from-teal-500 to-blue-700",
  borderGradient = "from-teal-500 via-purple-500 to-blue-500",
  blur = 20,
  className,
  children,
  ...props
}: GlowingCardProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "group relative max-w-lg rounded-xl border border-black/5 bg-gray-900 px-4 py-8 sm:px-8 lg:px-12",
        className
      )}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      {...props}
    >
      <div className="relative z-10">{children}</div>

      {/* Glow effect */}
      <div
        className={cn(
          "absolute -inset-px rounded-xl opacity-0 transition-all duration-500",
          isFocused ? "opacity-100" : "opacity-0"
        )}
        style={{ zIndex: -1 }}
      >
        {/* Main glow */}
        <div
          className={`absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-r ${gradient} blur-[${blur}px]`}
          style={{
            transition: "transform 400ms",
            transform: isFocused ? "translate(30%, 30%)" : "translate(0%, 0%)",
          }}
        ></div>

        {/* Border glow */}
        <div
          className={`absolute inset-px rounded-xl bg-gradient-to-r ${borderGradient} blur-[2px]`}
        ></div>
      </div>
    </div>
  );
}