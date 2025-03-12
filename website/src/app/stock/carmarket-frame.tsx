'use client';
import React, { useEffect, useRef } from 'react';
import styles from './carmarket-frame.module.scss';
import { notNil } from '@/core/util/is-nil';

export const CarmarketFrame: React.FC = () => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      return;
    }
    mounted.current = true;

    if (notNil(window.carmarketFrameConfiguration)) {
      window.location.reload();
      return;
    }

    window.carmarketFrameConfiguration = {
      selector: '#carmarket-frame',
      id: 'cly5yzmcs2xcc07w99f167a6m',
      language: 'de',
      dealerIds: [4657],
      excludedFilters: ['geo'],

      searchPlaceholder: 'z.B. KGM',

      themePageBackground: '#ffffff',
      themePageForeground: '#1E1E1E',

      themePrimary: '#2b64ad',
      themePrimaryHover: '#000000',
      themeOnPrimary: '#ffffff',

      themeSecondary: '#3d8ff8',
      themeSecondaryHover: '#000000',
      themeOnSecondary: '#ffffff',

      themeBoxBackground: '#F0F3F7',
      themeBorder: '#999999',
      themeMeta: '#999999',
    };

    const script = document.createElement('script');
    script.src = 'https://whitelabel.carmarket.ch/v1/carmarket.js';
    script.type = 'module';

    document.body.appendChild(script);
  }, []);
  return <div id="carmarket-frame" className={styles.root} />;
};
