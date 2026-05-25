'use client';

import Link from 'next/link';
import { useRole } from '@/app/context/role-context';
import { RoleSwitcher } from './role-switcher';

export function AppNav() {
  const { role } = useRole();
  const navItems = role === 'learner'
    ? [
        { href: '/dashboard', label: 'Dashboard' },
      ]
    : [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/tasks', label: 'Tasks' },
        { href: '/learners', label: 'Learners' },
        { href: '/system-map', label: 'System' },
      ];

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-lg hover:text-accent transition-colors">
          SquadFlow
        </Link>
        <div className="flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm hover:text-foreground/80 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <RoleSwitcher />
      </div>
    </nav>
  );
}
