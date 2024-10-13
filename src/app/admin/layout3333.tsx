import React from "react";
import AdminNav from "./components/AdminNav";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl text-muted-foreground">Admin page</h2>
      <AdminNav />
      {children}
    </div>
  );
}
