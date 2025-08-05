"use client";

import React from "react";
import { useUser } from "@/context/user-context";
import { usePathname, useRouter } from "next/navigation";
import Button from "../button/button";
import {
  MdChevronLeft,
  MdChevronRight,
  MdMovie,
  MdLogout,
  MdOutlineMovie,
} from "@/icons";

export default function SideNav({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: (val: boolean) => void;
}) {
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems: {
    name: string;
    href: string;
    icon: React.ElementType;
  }[] = [{ name: "Catalog", href: "/home", icon: MdOutlineMovie }];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleSidebar = () => {
    onToggle(!expanded);
  };

  if (!user) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 z-50 shadow-xl ${expanded ? "w-64" : "w-20"}`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-indigo-700 flex items-center justify-between">
          {expanded ? (
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 rounded-lg p-2">
                <MdMovie className="text-2xl text-white" size={20} />
              </div>

              <div className="flex flex-col">
                <h1 className="text-xl font-bold leading-none">MovieApp</h1>
                <span className="text-sm text-black-500">A Holcim Project</span>
              </div>
            </div>
          ) : (
            <div className="bg-indigo-600 rounded-lg p-2 mx-auto">
              <MdMovie className="text-2xl" size={20} />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-indigo-700 p-2 rounded-lg transition-colors"
            aria-label={expanded ? "Contraer menú" : "Expandir menú"}
          >
            {expanded ? (
              <MdChevronLeft size={15} />
            ) : (
              <MdChevronRight size={15} />
            )}
          </button>
        </div>

        <div
          className={`p-4 flex items-center ${expanded ? "justify-start space-x-3" : "justify-center"}`}
        >
          <div className="relative">
            <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-indigo-800"></div>
          </div>

          {expanded && (
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.username}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-indigo-700 text-white font-medium"
                        : "hover:bg-indigo-700/50"
                    } ${expanded ? "justify-start" : "justify-center"}`}
                  >
                    <Icon className="text-2xl" />
                    {expanded && <span className="ml-3">{item.name}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-indigo-700">
          {expanded ? (
            <Button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              <span>Sign Out</span>
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              className="w-full flex items-center justify-center py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              aria-label="Sign Out"
            >
              <MdLogout className="text-black-600" size={24} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
