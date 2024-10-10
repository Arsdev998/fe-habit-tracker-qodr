"use client"
import { useGetMonthHabitsQuery } from "@/app/lib/redux/api/habitApi";
import { useAppSelector } from "@/app/lib/redux/hook";

export default function HabitTracker() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.sub;
  const monthId = 5;
  const { data } = useGetMonthHabitsQuery({
    monthId: monthId.toString(),
    userId,
  });

  console.log(data);
  return (
    <div>
      <h1>Habit Tracker</h1>
    </div>
  );
}
