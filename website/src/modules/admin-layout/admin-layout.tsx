import React, { ReactNode } from 'react';
import { Typography } from '@/visual-components/typography/typography';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Link } from '@/visual-components/link/link';
import { PasswordSection } from '@/modules/admin-layout/password-section';
import styles from './admin-layout.module.scss';
import { InlineSpacer, Spacer } from '@/visual-components/spacer/spacer';

type Props = {
  children: ReactNode;
};

export const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div>
        <GridContainer>
          <GridItem>
            <header className={styles.header}>
              <div>
                <Typography variant="title-2">Admin Bereich</Typography>
                <Spacer size="04" />
                <Link href="/admin">Kapazitätsübersicht</Link>
                <InlineSpacer size="03" />
                <Typography tag="span">•</Typography>
                <InlineSpacer size="03" />
                <Link href="/admin/bookings">Anpassung Buchungen</Link>
              </div>

              <PasswordSection />
            </header>
          </GridItem>
        </GridContainer>
        {children}
      </div>
      <footer className={styles.footer}>
        <GridContainer>
          <GridItem>
            <Typography>Admin Bereich</Typography>
            <Link href="/" accent>
              Zurück zur Hauptseite
            </Link>
          </GridItem>
        </GridContainer>
      </footer>
    </div>
  );
};
