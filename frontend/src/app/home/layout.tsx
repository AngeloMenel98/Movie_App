'use client'

import { useUser } from "@/context/user-context";
import { redirect } from "next/navigation";
import SideNav from "@/components/side-nav/side-nav";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isInitialized } = useUser();

  if (isInitialized && !user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 ml-64 p-6">
        {children}
      </main>
    </div>
  );
}