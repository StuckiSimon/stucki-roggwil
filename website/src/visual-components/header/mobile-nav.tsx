'use client';
import React, { useRef } from 'react';
import { Link } from '@/visual-components/link/link';
import { NavItem } from '@/visual-components/header/header';
import styles from './mobile-nav.module.scss';

type Props = {
  navItems: NavItem[];
};

export const MobileNav: React.FC<Props> = ({ navItems }) => {
  const toggleRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.mobileNav}>
      <input ref={toggleRef} type="checkbox" id="mobile-nav-toggle" className={styles.toggle} />
      <label htmlFor="mobile-nav-toggle" className={styles.toggleLabel}>
        <span></span>
        <span></span>
        <span></span>
      </label>
      <ul className={styles.mobileNavList}>
        {navItems.map((item) => (
          <li key={item.target}>
            <Link
              href={item.target}
              accent
              onClick={() => {
                toggleRef.current!.checked = false;
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
