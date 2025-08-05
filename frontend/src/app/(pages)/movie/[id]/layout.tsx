"use client";

import { useUser } from "@/context/user-context";
import { redirect } from "next/navigation";
import SideNav from "@/components/side-nav/side-nav";
import { useState } from "react";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isInitialized } = useUser();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  if (isInitialized && !user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <SideNav expanded={isSidebarExpanded} onToggle={setIsSidebarExpanded} />
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarExpanded ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
