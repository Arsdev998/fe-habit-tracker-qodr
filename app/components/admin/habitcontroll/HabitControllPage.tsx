import HabitList from "./HabitList";
import MonthList from "./MonthList";

const HabitControllPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="my-5">
        <h1 className="text-center font-bold text-xl">Kontroll Habit Dan Bulan</h1>
      </div>
      <div className="flex gap-4">
        <HabitList />
        <MonthList />
      </div>
    </div>
  );
};

export default HabitControllPage;
