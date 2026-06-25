'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  onLinkClick?: () => void;
  vertical?: boolean;
}

export default function Navigation({ onLinkClick, vertical = false }: NavigationProps) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Trang chủ' },
    { href: '/verbs-audio', label: 'Động từ / Verbs' },
    { href: '/grammar/a1', label: 'Ngữ pháp A1' },
    { href: '/tenses-practice', label: 'Ôn tập / 12 thì' },
  ];

  return (
    <nav className="mt-2 sm:mt-0" aria-label="Điều hướng chính">
      <div className={`container mx-auto ${vertical ? 'flex flex-col' : 'flex flex-col sm:flex-row'} gap-2 ${!vertical ? 'overflow-x-auto' : ''} pb-1 sm:pb-0 px-3 sm:px-0`}>
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === '/grammar/a1' && pathname.startsWith('/grammar'));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={`${vertical ? 'w-full' : ''} px-2 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer text-xs sm:text-sm md:text-base ${
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
