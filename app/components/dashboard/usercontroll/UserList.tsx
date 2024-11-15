"use client"

import { useGetAllUserQuery } from "@/app/lib/redux/api/userApi"

const UserList = () => {
    const {data} = useGetAllUserQuery()
    console.log()
  return (
    <div>
      
    </div>
  )
}

export default UserList
