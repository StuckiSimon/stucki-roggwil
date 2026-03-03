import React from 'react';
import NextLink from 'next/link';
import { Typography } from '@/visual-components/typography/typography';
import { Icon } from '@/visual-components/icon/icon';
import styles from './card.module.scss';
import { notNil } from '@/core/util/is-nil';

type Props = {
  title: string;
  image: string | null;
  text: string;
  cta: {
    text: string;
    href: string;
  };
};

export const Card: React.FC<Props> = ({ title, image, text, cta }) => {
  const hasImage = notNil(image);
  return (
    <NextLink href={cta.href} className={styles.root} tabIndex={0} aria-label={title}>
      {hasImage ? (
        <picture className={styles.picture}>
          <img className={styles.image} src={`${image}?w=600&h=450&fit=crop`} alt={title} />
        </picture>
      ) : null}
      <div className={styles.wrapper}>
        <Typography variant="buttontext" className={styles.title}>
          {title}
        </Typography>
        <Typography className={styles.text}>{text}</Typography>
      </div>
      <span className={styles.chevron} aria-hidden="true">
        <Icon variant="chevron-right" size="32" />
      </span>
    </NextLink>
  );
};

export const CardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
