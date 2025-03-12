import React from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';
import logoSvg from '@/visual-components/shared-assets/logo.svg';
import { Link } from '@/visual-components/link/link';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';

type Props = {
  accent?: boolean;
};

export const Header: React.FC<Props> = ({ accent = false }) => {
  return (
    <header
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
              <li>
                <Link href="/stock" accent>
                  Lagerfahrzeuge
                </Link>
              </li>
              <li>
                <Link href="/services" accent>
                  Dienstleistungen
                </Link>
              </li>
              <li>
                <Link href="/about" accent>
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/contact" accent>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </GridItem>
      </GridContainer>
    </header>
  );
};
