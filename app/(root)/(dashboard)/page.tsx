"use client";

import React from "react";
import { useAppSelector } from "@/app/lib/redux/hook";

export default function Page() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="">
      <h1>Dashboard</h1>
      <p className="font-semibold">
        Ahlan Wasahlan{" "}
        <span className="font-bold text-green-600">{user?.fullname}</span>
      </p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi earum
      fugit ullam ut libero corporis optio delectus nemo ex dolor perspiciatis
      sit voluptatum esse unde, quaerat repellat blanditiis laboriosam.
      Mollitia?
    </div>
  );
}
