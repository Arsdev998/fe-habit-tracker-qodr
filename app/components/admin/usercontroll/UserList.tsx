"use client";

import {
  useDeletedUserMutation,
  useGetAllUserQuery,
} from "@/app/lib/redux/api/userApi";
import { Skeleton } from "@/components/ui/skeleton";
import { FaUser } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModalConfirmDelete from "@/app/components/organism/modal/ModalConfirmDelete";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { UserType } from "@/app/lib/types";

const UserList = () => {
  const { data: userData, isLoading } = useGetAllUserQuery();
  const [
    deletedUser,
    {
      isError: deletedUserError,
      isLoading: deletedUserLoading,
      isSuccess: deletedUserDeleted,
      reset: deletedUserReset,
    },
  ] = useDeletedUserMutation();

  return (
    <div className="min-w-[300px] md:min-w-[800px] max-w-[1200px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tanggal Masuk</TableHead>
            <TableHead colSpan={2}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Skeleton className="min-w-[300px] h-50 md:min-w-[700px] max-w-[1200px bg-black/20" />
              </TableCell>
            </TableRow>
          ) : userData?.length > 0 ? (
            userData?.map((user: UserType) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <ModalConfirmDelete
                  icon={
                    <MdDelete className="text-red-500 cursor-pointer mx-auto" />
                  }
                  isDeletingError={deletedUserError}
                  isLoading={deletedUserLoading}
                  isDeletingSuccess={deletedUserDeleted}
                  onConfirmDelete={() => deletedUser(user.id)}
                  resetState={deletedUserReset}
                />
                <TableCell>
                  <Link href={`/admindashboard/user/${user.id}`}>
                    <FaUser />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>Belum ada User</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
