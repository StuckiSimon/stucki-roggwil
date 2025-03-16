import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import logoSvg from '@/visual-components/shared-assets/logo.svg';
import { Link } from '@/visual-components/link/link';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { MobileNav } from '@/visual-components/header/mobile-nav';
import { HeaderScrollHandler } from '@/visual-components/header/header-scroll-handler';

type Props = {
  accent?: boolean;
};

export type NavItem = {
  target: string;
  label: string;
};

export const Header: React.FC<Props> = ({ accent = false }) => {
  const navItems = [
    {
      target: '/stock',
      label: 'Lagerfahrzeuge',
    },
    {
      target: '/services',
      label: 'Dienstleistungen',
    },
    {
      target: '/about',
      label: 'Über uns',
    },
    {
      target: '/contact',
      label: 'Kontakt',
    },
  ] satisfies NavItem[];

  return (
    <header
      id="stucki-app-header"
      className={classNames(styles.root, {
        [styles.accent]: accent,
      })}
    >
      <GridContainer>
        <GridItem>
          <div className={styles.container}>
            <Link href="/">
              <img src={logoSvg.src} alt="Garage Stucki AG" className={styles.logo} />
            </Link>
            <ul className={styles.nav}>
              {navItems.map((item) => (
                <li key={item.target}>
                  <Link href={item.target} accent>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MobileNav navItems={navItems} />
          </div>
        </GridItem>
      </GridContainer>
      <HeaderScrollHandler className={styles.scrolled} htmlSelector="#stucki-app-header" />
    </header>
  );
};
