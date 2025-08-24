"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { garamond } from "@/lib/fonts";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <Card className="border-neutral-900 bg-neutral-950/40 text-neutral-200 max-w-md w-full">
      <CardHeader>
        <CardTitle
          className={`${garamond.className} text-2xl text-neutral-100`}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
