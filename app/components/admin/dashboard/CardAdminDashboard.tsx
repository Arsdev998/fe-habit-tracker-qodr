"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface CardAdminDashboardProps {
  icon: React.ReactNode;
  desc: string;
  count: string;
  href: string;
}

const CardAdminDashboard = ({
  icon,
  desc,
  count,
  href,
}: CardAdminDashboardProps) => {
  return (
    <Card className="w-[200px] h-[150px] flex flex-col items-center">
      <CardHeader className="text-3xl m-0 p-5 text-green-500">
        <Link href={href}>{icon}</Link>
      </CardHeader>
      <CardDescription className="font-bold mb-2">{desc}</CardDescription>
      <CardContent>
        <p className="font-bold py-2 px-3.5 bg-green-500 rounded-full">
          {count}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardAdminDashboard;
