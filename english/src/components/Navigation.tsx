'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: '🏠 Trang chủ', emoji: '🏠' },
    { href: '/verbs-audio', label: '🔊 Phát âm động từ', emoji: '🔊' },
    { href: '/tenses-practice', label: '📚 Luyện tập 12 thì', emoji: '📚' },
  ];

  return (
    <nav className=" ">
      <div className="container mx-auto flex gap-2 overflow-x-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
