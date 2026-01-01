import React from 'react';
import styles from './rental-teaser.module.scss';
import { ButtonLink } from '@/visual-components/button/button';
import { InlineSpacer, Spacer } from '@/visual-components/spacer/spacer';
import { Typography } from '@/visual-components/typography/typography';
import { formatNumber, formatRappen } from '@/modules/i18n/formatter';
import { usePathBuilder } from '@/core/router/use-path-builder';

type Props = {
  imageUrl: string;
  title: string;
  description: string;
  dailyRate: number;
  additionalKm: number;
};

export const RentalTeaser: React.FC<Props> = ({ imageUrl, title, description, dailyRate, additionalKm }) => {
  const { contactPath } = usePathBuilder();

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <img src={`${imageUrl}?w=860&h=620&fit=crop`} alt={title} />
      </div>
      <div className={styles.content}>
        <Typography variant="sub-title" color="blue">
          {title}
        </Typography>
        <Spacer size="04" />
        <Typography variant="text">{description}</Typography>
        <Spacer size="06" />
        <Typography variant="sub-text" color="grey">
          inkl. 100 km pro Tag, zusätzliche km {formatRappen(additionalKm)} CHF
        </Typography>
        <Spacer size="02" />
        <span>
          <Typography variant="text" tag="span">
            für{' '}
          </Typography>
          <Typography tag="span" variant="buttontext" color="blue">
            {formatNumber(dailyRate)}.– CHF
          </Typography>
          <InlineSpacer size="03" />
          <Typography variant="text" tag="span">
            / Tag mieten
          </Typography>
        </span>
        <Spacer size="06" />
        <ButtonLink href={contactPath()}>Kontakt</ButtonLink>
      </div>
    </div>
  );
};
