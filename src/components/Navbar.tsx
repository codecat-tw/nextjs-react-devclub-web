'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { title: '部落格', path: '/blogs' },
  { title: '關於我們', path: '/about' },
];

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [textColor, setTextColor] = useState('text-black'); // 預設黑色字（適合白色背景）
  const pathname = usePathname(); // 取得當前頁面路由

  // 根據不同頁面背景設定 Navbar 文字顏色
  useEffect(() => {
    const darkPages = ['/','/home']; 
    if (darkPages.includes(pathname)) {
      setTextColor('text-white');
    } else {
      setTextColor('text-black');
    }
  }, [pathname]);

  return (
    <nav className="fixed left-0 top-0 z-50 w-screen mx-auto bg-transparent backdrop-blur-sm w-full">
      <div className="container mx-auto h-16 flex flex-wrap items-center justify-between px-4 py-2">
        <Link href={'/'} className={`text-3xl font-semibold ${textColor}`}>
          Next.js / React 讀書會
        </Link>
        <div className="hidden md:block md:w-auto">
          <ul className="mt-0 flex p-4 md:flex-row md:space-x-8 md:p-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path} className={`block rounded-sm py-2 pl-3 pr-4 ${textColor} hover:opacity-70 sm:text-xl md:p-0`}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="block md:hidden">
          {!navbarOpen ? (
            <button onClick={() => setNavbarOpen(true)} className={`flex items-center rounded-sm border border-black px-3 py-2 ${textColor}`}>
              <Icon icon="mdi:menu" className="h-6 w-6" />
            </button>
          ) : (
            <button onClick={() => setNavbarOpen(false)} className={`flex items-center rounded-sm border border-black px-3 py-2 ${textColor}`}>
              <Icon icon="mdi:close" className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      {navbarOpen && (
        <ul className="flex flex-col items-center py-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path} className={`block rounded-sm py-2 pl-3 pr-4 ${textColor} hover:opacity-70 sm:text-xl md:p-0`}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}