"use client";
import { useState } from "react";
import { useUpdateHabitStatusMutation } from "@/app/lib/redux/api/habitApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModalAddHabit from "./ModalAddHabit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdEdit, MdEditNote } from "react-icons/md";
import ModalEditHabit from "./ModalEditHabit";
import ModalDeleteHabit from "./ModalConfirmDeleteHabit";

interface TableProps {
  title: string;
  days: any[]; // Sesuaikan dengan tipe data dari API
  selectMonthId: string;
  refecthHabit: () => void;
}

const TableMontHabit: React.FC<TableProps> = ({
  title,
  days,
  selectMonthId,
  refecthHabit,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState<{[habitId: string]: boolean; }>({});

  const [updateHabitStatus] = useUpdateHabitStatusMutation();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.sub || user?.id;

  // State untuk menyimpan status lokal checkbox
  const [localStatus, setLocalStatus] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (!days || days.length === 0) {
    return <div>Loading...</div>;
  }

  const handleCheckBoxChange = async (
    dayId: string,
    habitId: string,
    currentStatus: boolean
  ) => {
    const checkboxKey = `${dayId}-${habitId}`;
    setLocalStatus((prev) => ({
      ...prev,
      [checkboxKey]: !currentStatus,
    }));
    await updateHabitStatus({ dayId, habitId, userId, status: !currentStatus });
  };

  const handleDropdownToggle = (habitId: string, isOpen: boolean) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [habitId]: isOpen,
    }));
  };


  return (
    <Table>
      <TableHeader>
        <TableHead
          colSpan={days.length}
          className="text-center font-bold text-black text-[20px]"
        >
          {title}
        </TableHead>
        <TableRow>
          <TableHead className="flex items-center">
            Amalan
            <ModalAddHabit
              monthName={title}
              monthId={selectMonthId}
              userId={userId}
              onHabitAdded={refecthHabit}
            />
          </TableHead>
          {days.map((day: any, index: number) => (
            <TableHead key={index} className="text-[13px] px-3 font-bold">
              {day.date}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {days[0]?.habitStatuses?.map((habit: any, habitIndex: number) => (
          <TableRow key={habitIndex}>
            {/* habit title */}
            <TableCell className="flex items-center justify-between">
              {habit.habit.title}
              {habit.habit.userId === userId && (
                <DropdownMenu
                  open={isDropdownOpen[habit.habit.id] || false}
                  onOpenChange={(isOpen) =>
                    handleDropdownToggle(habit.habit.id, isOpen)
                  }
                >
                  <DropdownMenuTrigger>
                    <MdEditNote />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <div onClick={(e) => e.stopPropagation()}>
                          <ModalEditHabit
                            currentHabit={habit.habit.title}
                            habitId={habit.habit.id}
                            onHabitEdit={() => {
                              refecthHabit();
                               handleDropdownToggle(habit.habit.id, false); // Tutup dropdown saat edit selesai
                            }}
                          />
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div onClick={(e) => e.stopPropagation()}>
                          <ModalDeleteHabit
                            habitId={habit.habit.id}
                            currentHabit={habit.habit.title}
                            onHabitDelete={() => {
                              refecthHabit();
                                handleDropdownToggle(habit.habit.id, false); // Tutup dropdown saat edit selesai
                            }}
                          />
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
            {/* checkbox habit */}
            {days.map((day: any, dayIndex: number) => {
              const habitStatus = day.habitStatuses.find(
                (hs: any) => hs.habit.title === habit.habit.title
              );
              // Unik key untuk setiap checkbox berdasarkan dayId dan habitId
              const checkboxKey = `${day.id}-${habitStatus.habit.id}`;
              // Tentukan status checkbox dari local state atau server
              const isChecked =
                localStatus[checkboxKey] !== undefined
                  ? localStatus[checkboxKey]
                  : habitStatus?.status || false;
              return (
                <TableCell key={dayIndex} className="text-center text-sm px-1">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() =>
                      handleCheckBoxChange(
                        day.id,
                        habitStatus.habit.id,
                        habitStatus?.status
                      )
                    }
                  />
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableMontHabit;
