"use client";

import UserList from "./UserList";
import ModalAddUser from "./ModalAddUser";


const UserControllPage = () => {
  
  return (
    <section className="p-2">
      <div className="mb-2">
        <h1 className="font-bold text-xl">Daftar User</h1>
        <ModalAddUser/>
      </div>
      <UserList />
    </section>
  );
};

export default UserControllPage;
