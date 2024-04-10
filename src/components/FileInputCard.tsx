/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FileInputCardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  discription: string;
};

export default function FileInputCard(props: FileInputCardProps) {
  return (
    <div className="transition-transform hover:scale-105"
    style={{ background: "linear-gradient(135deg, #ffffff, #f0f0f0)" }} // Add gradient background
    
    >
    <FileInputCardContent >
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm">{props.label}</p>
        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <p className="text-xs text-gray-500">{props.discription}</p>
      </section>
    </FileInputCardContent>
    </div>
  );
}

export function FileInputCardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}
