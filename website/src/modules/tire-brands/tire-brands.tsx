import React from 'react';
import styles from './tire-brands.module.scss';
import { TireBrandCard } from '@/visual-components/tire-brand-card/tire-brand-card';
import continentalLogo from './continental.svg';
import goodyearLogo from './goodyear.svg';
import esaLogo from './esa.svg';
import michelinLogo from './michelin.webp';

const TIRE_BRANDS = [
  {
    name: 'Continental',
    logo: continentalLogo,
    description:
      'Deutsches Premium-Reifenunternehmen mit über 150 Jahren Tradition. Steht für höchste Sicherheit und Zuverlässigkeit auf Schweizer Strassen.',
  },
  {
    name: 'Goodyear',
    logo: goodyearLogo,
    description:
      'Amerikanischer Reifenpionier mit innovativen Technologien für alle Jahreszeiten. Optimale Performance für jede Fahrsituation.',
  },
  {
    name: 'Michelin',
    logo: michelinLogo,
    description:
      'Französischer Premiumhersteller, der Sicherheit mit niedrigem Rollwiderstand verbindet. Bekannt für besonders langen Reifenverschleiss.',
  },
  {
    name: 'ESA+Tecar',
    logo: esaLogo,
    description:
      'Produziert durch Continental, bietet ESA+Tecar hochwertige Reifen zu einem attraktiven Preis für alle Fahrzeugtypen.',
  },
];

export const TireBrands: React.FC = () => {
  return (
    <div className={styles.grid}>
      {TIRE_BRANDS.map((brand) => (
        <TireBrandCard key={brand.name} logo={brand.logo} name={brand.name} description={brand.description} />
      ))}
    </div>
  );
};
