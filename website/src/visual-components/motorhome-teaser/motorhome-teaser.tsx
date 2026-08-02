import React from 'react';
import styles from './motorhome-teaser.module.scss';
import { ButtonLink } from '@/visual-components/button/button';
import { InlineSpacer, Spacer } from '@/visual-components/spacer/spacer';
import { Typography } from '@/visual-components/typography/typography';
import { usePathBuilder } from '@/core/router/use-path-builder';
import { formatNumber } from '@/modules/i18n/formatter';

type Props = {
  imageUrl: string;
  name: string;
  initialRegistrationMonth: number;
  initialRegistrationYear: number;
  mileageKm: number;
  priceChf: number;
  seatCount: number;
  sleepingPlaceCount: number;
};

export const MotorhomeTeaser: React.FC<Props> = ({
  imageUrl,
  name,
  initialRegistrationMonth,
  initialRegistrationYear,
  mileageKm,
  priceChf,
  seatCount,
  sleepingPlaceCount,
}) => {
  const { contactPath } = usePathBuilder();

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <img src={`${imageUrl}?w=860&h=620&fit=crop`} alt={name} />
      </div>
      <div className={styles.content}>
        <Typography variant="sub-title" color="blue">
          {name}
        </Typography>
        <Spacer size="04" />
        <Typography variant="sub-text">
          {seatCount} Sitzplätze, {sleepingPlaceCount} Schlafplätze
        </Typography>
        <Spacer size="01" />
        <Typography variant="sub-text" color="grey">
          Erstzulassung {initialRegistrationMonth}.{initialRegistrationYear}, {formatNumber(mileageKm)} km
        </Typography>
        <Spacer size="03" />
        <span className={styles.priceRow}>
          <Typography variant="text" tag="span">
            für{' '}
          </Typography>
          <Typography tag="span" variant="buttontext" color="blue">
            {formatNumber(priceChf)}.– CHF
          </Typography>
          <Typography variant="text" tag="span">
            kaufen
          </Typography>
        </span>
        <Spacer size="06" />
        <ButtonLink href={contactPath()}>Kontakt</ButtonLink>
      </div>
    </div>
  );
};
