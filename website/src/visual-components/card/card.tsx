import React from 'react';
import { Typography } from '@/visual-components/typography/typography';
import { ButtonLink } from '@/visual-components/button/button';
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
    <div className={styles.root}>
      <div>
        {hasImage ? <img className={styles.image} src={`${image}?w=600&h=450&fit=crop`} alt={title} /> : null}
        <div className={styles.wrapper}>
          <Typography variant="sub-title" color="blue" className={styles.title}>
            {title}
          </Typography>
          <Typography>{text}</Typography>
        </div>
      </div>
      <div className={styles.footer}>
        <ButtonLink href={cta.href}>{cta.text}</ButtonLink>
      </div>
    </div>
  );
};

export const CardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
