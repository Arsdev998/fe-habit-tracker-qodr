"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { count } from "console";
import React from "react";

interface CardAdminDashboardProps {
  icon: React.ReactNode;
  desc: string;
  count: string;
}

const CardAdminDashboard = ({ icon, desc, count }: CardAdminDashboardProps) => {
  return (
    <Card className="w-[200px] h-[150px] flex flex-col items-center">
      <CardHeader className="text-3xl m-0 p-5 text-green-500">{icon}</CardHeader>
      <CardDescription className="font-bold mb-2">{desc}</CardDescription>
      <CardContent>
        <p className="font-bold py-2 px-3.5 bg-green-500 rounded-full">{count}</p>
      </CardContent>
    </Card>
  );
};

export default CardAdminDashboard;
