'use client';
import React, { useEffect } from 'react';
import { notNil } from '@/core/util/is-nil';
import styles from './carmarket-frame.module.scss';

export const CarmarketFrame: React.FC = () => {
  useEffect(() => {
    if (notNil(window.carmarketFrameConfiguration)) {
      window.cmBuildIframe(window.carmarketFrameConfiguration);
      return () => {
        window.cmDestroyIframe();
      };
    }

    window.carmarketFrameConfiguration = {
      selector: '#carmarket-frame',
      id: 'cly5yzmcs2xcc07w99f167a6m',
      language: 'de',
      dealerIds: [4657],
      excludedFilters: ['geo', 'promotions', 'interiorColor', 'upholstery'],

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

    return () => {
      window.cmDestroyIframe?.();
    };
  }, []);
  return <div id="carmarket-frame" className={styles.root} />;
};
