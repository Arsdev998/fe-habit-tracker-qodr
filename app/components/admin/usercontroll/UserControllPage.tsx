"use client";

import UserList from "./UserList";
import ModalAddUser from "./ModalAddUser";


const UserControllPage = () => {
  
  return (
    <section className="flex justify-center flex-col items-center">
      <div className="">
        <h1 className="text-center font-bold text-xl">User Control</h1>
        <ModalAddUser/>
      </div>
      <UserList />
    </section>
  );
};

export default UserControllPage;
