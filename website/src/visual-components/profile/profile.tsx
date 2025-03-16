import React from 'react';
import { notNil } from '@/core/util/is-nil';
import styles from './profile.module.scss';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';

type Props = {
  title: string;
  subtitle: string;
  image: string | null;
};

export const Profile: React.FC<Props> = ({ title, subtitle, image }) => {
  const hasImage = notNil(image);
  return (
    <div>
      {hasImage ? <img src={`${image}?w=600&h=450&fit=crop`} alt={title} /> : null}
      <Spacer size="04" />
      <Typography variant="sub-title" color="blue" className={styles.title}>
        {title}
      </Typography>
      <Spacer size="02" />
      <Typography variant="text" className={styles.text}>
        {subtitle}
      </Typography>
    </div>
  );
};

export const ProfileContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
