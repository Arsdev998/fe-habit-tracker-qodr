"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "./lib/store";
import { login } from "./lib/features/authSlices/authAction";
import { LoginSchema } from "./schema/loginSchema";

export default function StoreProvider({
  children,
}: {
  data: LoginSchema;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
    // storeRef.current.dispatch(login(data));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
