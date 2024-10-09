"use client"
import { useRouter } from "next/navigation";
import { useAppSelector } from "../lib/hook";

export default function Home() {
   const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="h-screen">
      <p className="text-2xl font-bold">Ahlan Wasahlan Akhi{user?.name}</p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam modi eum
      in nulla iusto eos corporis perferendis, itaque facilis distinctio iure
      cum, quod natus, mollitia ut pariatur eligendi asperiores quaerat?
    </div>
  );
}
