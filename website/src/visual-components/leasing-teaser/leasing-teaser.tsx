import React from 'react';
import styles from './leasing-teaser.module.scss';
import { Link } from '@/visual-components/link/link';
import { ButtonLink } from '@/visual-components/button/button';
import { InlineSpacer, Spacer } from '@/visual-components/spacer/spacer';
import { Typography } from '@/visual-components/typography/typography';

type Props = {
  imageUrl: string;
  title: string;
  description: string;
  leasingDurationMonths: number;
  monthlyLeasingRate: number;
  totalKm: number;
  detailsUrl: string;
};

export const LeasingTeaser: React.FC<Props> = ({
  imageUrl,
  title,
  description,
  leasingDurationMonths,
  monthlyLeasingRate,
  totalKm,
  detailsUrl,
}) => {
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
        <span>
          <Typography variant="text" tag="span">
            Für{' '}
          </Typography>
          <Typography tag="span" variant="buttontext" color="blue">
            {monthlyLeasingRate}.– CHF
          </Typography>
          <InlineSpacer size="03" />
          <Typography variant="text" tag="span">
            / Monat leasen
          </Typography>
        </span>
        <Spacer size="02" />
        <Typography variant="text">
          {totalKm} km, {leasingDurationMonths} Monate Laufzeit
        </Typography>
        <Spacer size="06" />
        <ButtonLink href="/contact">Kontakt</ButtonLink>
        <InlineSpacer size="05" />
        <Link href={detailsUrl} className={styles.detailsLink}>
          Details zum Fahrzeug
        </Link>
      </div>
    </div>
  );
};
