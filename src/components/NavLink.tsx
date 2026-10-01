'use client';

import React from 'react';
import Link from 'next/link';
import { pathForView } from '../lib/navigate';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  view: string;
  params?: Record<string, string>;
  children: React.ReactNode;
}

/**
 * A real <a href> (via next/link) wherever the site used to navigate with a plain
 * onClick + router.push — so every page is a genuine link: middle-click, cmd/ctrl-click,
 * and "Open in new tab" from the context menu all work, not just in-app SPA clicks.
 * Accepts an optional onClick for side effects (closing a mobile menu, a drawer, etc.)
 * that should still run before the navigation.
 */
export function NavLink({ view, params, children, onClick, ...rest }: NavLinkProps) {
  return (
    <Link href={pathForView(view, params)} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export default NavLink;
