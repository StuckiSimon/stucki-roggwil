import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import NextLink from 'next/link';
import logoSvg from '@/visual-components/shared-assets/logo.svg';
import { Link } from '@/visual-components/link/link';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { MobileNav } from '@/visual-components/header/mobile-nav';
import { HeaderScrollHandler } from '@/visual-components/header/header-scroll-handler';
import { usePathBuilder } from '@/core/router/use-path-builder.ts';

type Props = {
  accent?: boolean;
  activePath?: string;
};

export type NavItem = {
  target: string;
  label: string;
};

export const Header: React.FC<Props> = ({ accent = false, activePath }) => {
  const { homePath, aboutPath, stockPath, bookingPath, contactPath } = usePathBuilder();
  const navItems = [
    {
      target: stockPath(),
      label: 'Lagerfahrzeuge',
    },
    {
      target: bookingPath(),
      label: 'Termin buchen',
    },
    {
      target: aboutPath(),
      label: 'Über uns',
    },
    {
      target: contactPath(),
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
            <NextLink href={homePath()}>
              <img src={logoSvg.src} alt="Garage Stucki AG" className={styles.logo} />
            </NextLink>
            <ul className={styles.nav}>
              {navItems.map((item) => (
                <li key={item.target}>
                  <Link href={item.target} accent active={activePath === item.target}>
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
