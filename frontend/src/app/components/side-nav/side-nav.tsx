
"use client";

import React, { useState } from 'react';
import { useUser } from '@/context/user-context';
import { usePathname, useRouter } from 'next/navigation';

const SideNav = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const navigationItems = [
    { name: 'Movies', href: '/movies' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  if (!user) return null;

  return (
    <div className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 z-50 shadow-xl ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full">
        {/* Logo y botón de expansión */}
        <div className="p-4 border-b border-indigo-700 flex items-center justify-between">
          {isExpanded ? (
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 rounded-lg p-2">
                <span className="text-2xl">🎬</span>
              </div>
              <h1 className="text-xl font-bold">MovieApp</h1>
            </div>
          ) : (
            <div className="bg-indigo-600 rounded-lg p-2 mx-auto">
              <span className="text-2xl">🎬</span>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="text-white hover:bg-indigo-700 p-2 rounded-lg transition-colors"
            aria-label={isExpanded ? "Contraer menú" : "Expandir menú"}
          >
            {isExpanded ? '«' : '»'}
          </button>
        </div>

        {/* Información del usuario */}
        <div className={`p-4 flex items-center ${isExpanded ? 'justify-start space-x-3' : 'justify-center'}`}>
          <div className="relative">
            <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-indigo-800"></div>
          </div>
          
          {isExpanded && (
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.username}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href 
                      ? 'bg-indigo-700 text-white font-medium' 
                      : 'hover:bg-indigo-700/50'
                  } ${isExpanded ? 'justify-start' : 'justify-center'}`}
                >
                  {isExpanded && <span className="ml-3">{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-indigo-700">
          {isExpanded ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              <span>Cerrar sesión</span>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              aria-label="Cerrar sesión"
            >
              <span>🚪</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNav;