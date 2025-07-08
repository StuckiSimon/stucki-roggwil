import React from 'react';
import isNil, { notNil } from '@/core/util/is-nil';
import styles from './profile.module.scss';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import Link from 'next/link';

type Props = {
  title: string;
  subtitle: string;
  image: string | null;
  href?: string;
};

export const Profile: React.FC<Props> = ({ title, subtitle, image, href }) => {
  const hasImage = notNil(image);
  const content = (
    <>
      {hasImage ? <img src={`${image}?w=600&h=450&fit=crop`} alt={title} /> : <div className={styles.placeholder} />}
      <Spacer size="04" />
      <Typography variant="sub-title" color="blue" className={styles.title}>
        {title}
      </Typography>
      <Spacer size="02" />
      <Typography variant="text" className={styles.text}>
        {subtitle}
      </Typography>
    </>
  );
  return isNil(href) ? <div>{content}</div> : <Link href={href}>{content}</Link>;
};

export const ProfileContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
