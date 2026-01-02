import React from 'react';
import { PictogramVariant } from '@/visual-components/icon/icon-data.tsx';
import Link from 'next/link';
import { Pictogram } from '@/visual-components/icon/icon.tsx';
import { Typography } from '@/visual-components/typography/typography.tsx';
import styles from './cta-picto-link.module.scss';

type Props = {
  href: string;
  picto: PictogramVariant;
  title: string;
  description: string;
};

export const CtaPictoLink: React.FC<Props> = ({ href, picto, title, description }) => {
  return (
    <Link href={href} className={styles.root}>
      <Pictogram size="64" variant={picto} className={styles.picto} />
      <Typography variant="title-3" color="blue" className={styles.title}>
        {title}
      </Typography>
      <Typography className={styles.description}>{description}</Typography>
    </Link>
  );
};
