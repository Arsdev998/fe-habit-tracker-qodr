"use client";
import { useState, useEffect } from "react";
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
import { MdEditNote } from "react-icons/md";
import ModalEditHabit from "./ModalEditHabit";
import ModalDeleteHabit from "./ModalConfirmDeleteHabit";
import { toast } from "sonner";

interface TableProps {
  title: string;
  days: any[];
  selectMonthId: string;
  refecthHabit: () => void;
}

const TableMontHabit: React.FC<TableProps> = ({
  title,
  days,
  selectMonthId,
  refecthHabit,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState<{
    [habitId: string]: boolean;
  }>({});
  const [updateHabitStatus] = useUpdateHabitStatusMutation();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.sub || user?.id;
  const [localStatus, setLocalStatus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Effect untuk menginisialisasi localStatus dari data
  useEffect(() => {
    const initialStatus: { [key: string]: boolean } = {};
    days?.forEach((day) => {
      day?.habitStatuses?.forEach((habitStatus: any) => {
        const checkboxKey = `${day.id}-${habitStatus.habit.id}`;
        initialStatus[checkboxKey] = habitStatus.status || false;
      });
    });
    setLocalStatus(initialStatus);
  }, [days]);

  if (!days || days.length === 0) {
    return <div>Loading...</div>;
  }

  // Fungsi untuk menghitung persentase kebiasaan yang sudah dilakukan
  const calculateHabitPercentage = (habit: any) => {
    let completedCount = 0;
    let totalDays = days.length;

    days.forEach((day) => {
      const habitStatus = day.habitStatuses.find(
        (hs: any) => hs.habit.title === habit.habit.title
      );
      const checkboxKey = `${day.id}-${habitStatus.habit.id}`;
      if (localStatus[checkboxKey]) {
        completedCount++;
      }
    });

    return totalDays > 0
      ? ((completedCount / totalDays) * 100).toFixed(1)
      : "0";
  };

  const handleCheckBoxChange = async (
    dayId: string,
    habitId: string,
    currentStatus: boolean
  ) => {
    const checkboxKey = `${dayId}-${habitId}`;

    if (isLoading[checkboxKey]) return;

    setIsLoading((prev) => ({ ...prev, [checkboxKey]: true }));

    const newStatus = !currentStatus;
    setLocalStatus((prev) => ({
      ...prev,
      [checkboxKey]: newStatus,
    }));

    try {
      const result = await updateHabitStatus({
        dayId,
        habitId,
        userId,
        status: newStatus,
      }).unwrap();

      if (result?.message === "Status updated successfully") {
        // Status berhasil diupdate
      } else {
        setLocalStatus((prev) => ({
          ...prev,
          [checkboxKey]: currentStatus,
        }));
      }
    } catch (error) {
      setLocalStatus((prev) => ({
        ...prev,
        [checkboxKey]: currentStatus,
      }));
      toast.error("Internal Server Error");
    } finally {
      setIsLoading((prev) => ({ ...prev, [checkboxKey]: false }));
    }
  };

   const handleDropdownToggle = (habitId: string, isOpen: boolean) => {
     if (!activeModal) {
       setDropdownOpen((prev) => ({
         ...prev,
         [habitId]: isOpen,
       }));
     }
   };

   const handleModalOpen = (modalId: string) => {
     setActiveModal(modalId);
   };

   const handleModalClose = () => {
     setActiveModal(null);
   };

  return (
    <Table>
      <TableHeader>
        <TableHead
          colSpan={days.length + 2} // Tambah 2 untuk kolom Amalan dan Persentase
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
          <TableHead className="text-[13px] px-3 font-bold text-center">
            Avg
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {days[0]?.habitStatuses?.map((habit: any, habitIndex: number) => (
          <TableRow key={habitIndex}>
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
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          handleModalOpen(`edit-${habit.habit.id}`);
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <ModalEditHabit
                            currentHabit={habit.habit.title}
                            habitId={habit.habit.id}
                            isOpen={activeModal === `edit-${habit.habit.id}`}
                            onOpenChange={(open) => {
                              if (!open) handleModalClose();
                            }}
                            onHabitEdit={() => {
                              refecthHabit();
                              handleModalClose();
                              setDropdownOpen((prev) => ({
                                ...prev,
                                [habit.habit.id]: false,
                              }));
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
                              handleDropdownToggle(habit.habit.id, false);
                            }}
                          />
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
            {days.map((day: any, dayIndex: number) => {
              const habitStatus = day.habitStatuses.find(
                (hs: any) => hs.habit.title === habit.habit.title
              );
              const checkboxKey = `${day.id}-${habitStatus.habit.id}`;
              return (
                <TableCell key={dayIndex} className="text-center text-sm px-1">
                  <Checkbox
                    checked={localStatus[checkboxKey] || false}
                    disabled={isLoading[checkboxKey]}
                    onCheckedChange={() =>
                      handleCheckBoxChange(
                        day.id,
                        habitStatus.habit.id,
                        localStatus[checkboxKey] || false
                      )
                    }
                  />
                </TableCell>
              );
            })}
            {/* Kolom Persentase */}
            <TableCell className="text-center font-medium">
              {calculateHabitPercentage(habit)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableMontHabit;
