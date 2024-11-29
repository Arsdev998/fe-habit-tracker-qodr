"use client";
import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useGetTraficHabitStatusQuery } from "@/app/lib/redux/api/admindashboardApi";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#10b981", // Green for completed
  },
  pending: {
    label: "Pending",
    color: "#f59e0b", // Amber for pending
  },
};

export function HabitStatusTrafficChart() {
  const { data, isLoading } = useGetTraficHabitStatusQuery();

  if (isLoading) return <Skeleton className="w-full h-full bg-black/20" />;
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-medium mb-4 text-center">Habit Traffic Bulan Ini</h2>
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="completed"
            fill={chartConfig.completed.color}
            radius={4}
          />
          <Bar dataKey="pending" fill={chartConfig.pending.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default HabitStatusTrafficChart;
