'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: '🏠 Trang chủ', emoji: '🏠' },
    { href: '/verbs-audio', label: '🔊 Phát âm động từ', emoji: '🔊' },
  ];

  return (
    <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 mb-6">
      <div className="container mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
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
