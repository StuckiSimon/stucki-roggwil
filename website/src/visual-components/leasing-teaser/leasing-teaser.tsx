import React from 'react';
import styles from './leasing-teaser.module.scss';
import { Link } from '@/visual-components/link/link';
import { ButtonLink } from '@/visual-components/button/button';
import { InlineSpacer, Spacer } from '@/visual-components/spacer/spacer';
import { Typography } from '@/visual-components/typography/typography';
import { formatNumber } from '@/modules/i18n/formatter';
import { usePathBuilder } from '@/core/router/use-path-builder';

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
          z.B. mit {formatNumber(totalKm)} km, {leasingDurationMonths} Monate Laufzeit
        </Typography>
        <Spacer size="02" />
        <span>
          <Typography variant="text" tag="span">
            für{' '}
          </Typography>
          <Typography tag="span" variant="buttontext" color="blue">
            {monthlyLeasingRate}.– CHF
          </Typography>
          <InlineSpacer size="03" />
          <Typography variant="text" tag="span">
            / Monat leasen
          </Typography>
        </span>
        <Spacer size="06" />
        <ButtonLink href={contactPath()}>Kontakt</ButtonLink>
        <InlineSpacer size="05" />
        <Link href={detailsUrl} className={styles.detailsLink}>
          Fahrzeuginfos
        </Link>
      </div>
    </div>
  );
};
