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
import ModalAddHabit from "../../organism/modal/ModalAddHabit";
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
import ModalEditHabit from "../../organism/modal/ModalEditHabit";
import ModalDeleteHabit from "../../organism/modal/ModalConfirmDeleteHabit";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface TableProps {
  title: string;
  days: any[];
  selectMonthId: string;
}

const TableMontHabit: React.FC<TableProps> = ({
  title,
  days,
  selectMonthId,
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
    return (
      <div>
        <Skeleton className="w-full min-w-[1200px] h-80 md:min-h-[500px] bg-black/10 dark:dark:bg-[#303030]" />
      </div>
    );
  }

  // Fungsi untuk menghitung persentase habit berdasarkan maxDays
  const calculateHabitPercentage = (habit: any) => {
    let completedCount = 0;
    const maxDays = habit.habit.maxDays || days.length; 

    days.forEach((day) => {
      const habitStatus = day.habitStatuses.find(
        (hs: any) => hs.habit.title === habit.habit.title
      );
      const checkboxKey = `${day.id}-${habitStatus.habit.id}`;
      if (localStatus[checkboxKey]) {
        completedCount++;
      }
    });

    return maxDays > 0
      ? Math.min((completedCount / maxDays) * 100, 100).toFixed(1) // Membatasi hingga 100%
      : "0";
  };

  // fungsi overall percentage
  const calculateOverallPercentage = () => {
    let totalCompletedDays = 0;
    let totalTargetDays = 0;

    days.forEach((day) => {
      day.habitStatuses.forEach((habitStatus: any) => {
        const checkboxKey = `${day.id}-${habitStatus.habit.id}`;
        const maxDays = habitStatus.habit.maxDays || days.length; // Menggunakan maxDays atau jumlah hari dalam bulan

        if (localStatus[checkboxKey]) {
          totalCompletedDays++; // Tambah jika checkbox dicentang
        }

        // Jumlahkan total target days hanya satu kali untuk setiap habit di bulan tersebut
        if (day.date === days[0].date) {
          totalTargetDays += maxDays;
        }
      });
    });

    // Hitung persentase keseluruhan dengan membatasi nilai hingga 100%
    return totalTargetDays > 0
      ? Math.min((totalCompletedDays / totalTargetDays) * 100, 100).toFixed(1)
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
        <TableRow>
          <TableHead
            colSpan={days.length + 2} // Tambah 2 untuk kolom Amalan dan Persentase
            className="text-center font-bold dark:text-white text-[20px]"
          >
            {title}
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="flex items-center">
            Amalan
            <ModalAddHabit
              monthName={title}
              monthId={selectMonthId}
              userId={userId}

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
                            dayCount={habit.habit.maxDays}
                            habitId={habit.habit.id}
                            isOpen={activeModal === `edit-${habit.habit.id}`}
                            onOpenChange={(open) => {
                              if (!open) handleModalClose();
                            }}
                            onHabitEdit={() => {
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
              const checkboxKey = `${day.id}-${habitStatus?.habit?.id}`;
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
        <TableRow>
          <TableCell colSpan={days.length + 1} className="text-center">
            Overal Persentage
          </TableCell>
          <TableCell className="text-center font-bold">
            {" "}
            {calculateOverallPercentage()}%
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableMontHabit;
