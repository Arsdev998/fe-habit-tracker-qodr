"use client";

import {
  useDeletedUserMutation,
  useGetAllUserQuery,
} from "@/app/lib/redux/api/userApi";
import { Skeleton } from "@/components/ui/skeleton";
import { FaEye } from "react-icons/fa6";
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
import { UserDataType } from "@/app/lib/types";
import ModalEditUser from "./ModalEditUser";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      <ScrollArea className="max-w-[350px] md:max-w-[1450px]">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tanggal Masuk</TableHead>
            <TableHead colSpan={3} className="text-center">Action</TableHead>
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
            userData?.map((user: UserDataType) => (
              <TableRow key={user.id}>
                <TableCell className="p-2">{user.name}</TableCell>
                <TableCell className="p-2">{user.fullname}</TableCell>
                <TableCell className="p-2">{user.email}</TableCell>
                <TableCell className="p-2">{user.role}</TableCell>
                <TableCell className="p-2">{user.joinDate}</TableCell>
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
                <TableCell className="text-center">
                  <Link href={`/admindashboard/user/${user.id}`}>
                    <FaEye className="mx-auto hover:text-green-500 duration-150"/>
                  </Link>
                </TableCell>
                
                <ModalEditUser
                 userId={user.id} 
                 email={user.email} 
                 fullname={user.fullname} 
                 joinDate={user.joinDate}
                 major={user.email}
                 name={user.name}
                 numberPhone={user.numberPhone}
                 role={user.role}
                 techStack={user.techStack}/>
              </TableRow>
            ))
          ) : (
            <TableRow>Belum ada User</TableRow>
          )}
        </TableBody>
       </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default UserList;
