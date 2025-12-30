'use client';
import React from 'react';
import classNames from 'classnames';
import { useAdminPassword } from '@/modules/admin-layout/useAdminPassword';
import { notNil } from '@/core/util/is-nil';
import { Typography } from '@/visual-components/typography/typography';
import styles from './password-section.module.scss';

type Props = {};

export const PasswordSection: React.FC<Props> = ({}) => {
  const { hasSetAdminPassword, adminPassword, setAdminPassword, resetAdminPassword } = useAdminPassword();

  return (
    <div
      className={classNames(styles.root, {
        [styles.loggedIn]: hasSetAdminPassword,
      })}
    >
      {hasSetAdminPassword ? (
        <button className={styles.button} onClick={resetAdminPassword} title="Logout">
          🔒
        </button>
      ) : (
        <button className={styles.button} onClick={resetAdminPassword} disabled>
          ⚠️
        </button>
      )}
      <label className={styles.label}>
        <Typography variant="sub-text">{notNil(adminPassword) ? 'Eingeloggt als Admin' : 'Admin Passwort'}</Typography>
        <input
          type="password"
          value={adminPassword ?? ''}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="API Key eingeben"
          className={styles.input}
        />
      </label>
    </div>
  );
};
