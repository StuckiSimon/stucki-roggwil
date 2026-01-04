import React from 'react';
import styles from './spinner.module.scss';
import { Typography } from '@/visual-components/typography/typography.tsx';
import classNames from 'classnames';

export const Spinner: React.FC = () => {
  return (
    <div className={styles.root}>
      <MonsterTruck />
      <Typography variant="sub-buttontext">Laden…</Typography>
    </div>
  );
};

/**
 * Adapted from https://www.reshot.com/free-svg-icons/item/monster-truck-D2G78BKSJY/
 * @constructor
 */
const MonsterTruck = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={120}
      height={120}
      viewBox="-0.7 -0.7 8.2 7.7"
      style={{
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        imageRendering: 'optimizeQuality',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      }}
    >
      <defs>
        <style>{`.fil0{fill:currentColor;fill-rule:nonzero}`}</style>
      </defs>
      <g id="body" className={styles.chassis}>
        <path
          className="fil0"
          d="M2.578 1.363h1.08c.032 0 .06.014.08.036l.032.031c.392.382.621.605 1.007.909l.8.13a.55.55 0 0 1 .279.124.337.337 0 0 1 .117.256v.552a.368.368 0 0 1-.175.312 1.154 1.154 0 0 0-.128-.17.2.2 0 0 0 .035-.026.157.157 0 0 0 .055-.116V2.85a.13.13 0 0 0-.047-.098.336.336 0 0 0-.17-.073l-.818-.132a.106.106 0 0 1-.057-.023c-.41-.32-.642-.547-1.046-.94l-.007-.007H2.578a.467.467 0 0 0-.469.468v.53a.107.107 0 0 1-.106.106h-.736a.217.217 0 0 0-.146.054.157.157 0 0 0-.054.115v.552c0 .045.02.086.054.116a.2.2 0 0 0 .036.025c-.048.053-.091.11-.129.171a.368.368 0 0 1-.175-.312V2.85c0-.107.048-.204.126-.274a.43.43 0 0 1 .288-.108h.629v-.423a.68.68 0 0 1 .682-.681zm1.221 2.421h-.771a1.152 1.152 0 0 0-.144-.213h1.059a1.152 1.152 0 0 0-.144.213z"
        />
        <path
          className="fil0"
          d="M4.962 2.574H2.723a.357.357 0 0 1-.231-.084.289.289 0 0 1-.105-.22v-.236c0-.086.04-.164.105-.22a.357.357 0 0 1 .231-.083h1.31v.213h-1.31a.143.143 0 0 0-.093.032.078.078 0 0 0-.03.058v.237c0 .021.012.042.03.058.023.02.056.032.093.032h2.24v.213zM2.984 2.712h.368v.213h-.368z"
        />
        <rect x="1.042" y="2.895" width="0.43" height="0.213" fill="currentColor" />
        <rect x="5.384" y="2.895" width="0.43" height="0.213" fill="currentColor" />
      </g>
      <g id="wheels">
        <circle cx="2.008" cy="4.307" r="1.0" stroke="currentColor" strokeWidth="0.2" fill="transparent" />
        <circle cx="2.008" cy="4.307" r="0.3" stroke="currentColor" strokeWidth="0.2" fill="transparent" />
        <circle cx="4.819" cy="4.307" r="1.0" stroke="currentColor" strokeWidth="0.2" fill="transparent" />
        <circle cx="4.819" cy="4.307" r="0.3" stroke="currentColor" strokeWidth="0.2" fill="transparent" />
      </g>
      <g id="dust">
        <circle cx="0.8" cy="5.2" r="0.18" className={classNames(styles.dust, styles.dust1)} fill="currentColor" />
        <circle cx="1.1" cy="5.6" r="0.13" className={classNames(styles.dust, styles.dust2)} fill="currentColor" />
        <circle cx="1.4" cy="4.9" r="0.15" className={classNames(styles.dust, styles.dust3)} fill="currentColor" />
        <circle cx="1.0" cy="5.4" r="0.11" className={classNames(styles.dust, styles.dust4)} fill="currentColor" />
        <circle cx="1.3" cy="5.1" r="0.09" className={classNames(styles.dust, styles.dust5)} fill="currentColor" />
      </g>
    </svg>
  );
};
