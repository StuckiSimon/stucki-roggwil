'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './fact-list.module.scss';

type Props = {
  children: ReactNode;
};

export const FactList: React.FC<Props> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showNavRightButton, setShowNavRightButton] = useState(false);
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    const updateButtonVisibility = () => {
      const { scrollWidth, clientWidth, scrollLeft } = container;
      setShowNavRightButton(scrollWidth > clientWidth && scrollLeft + clientWidth < scrollWidth);
    };
    updateButtonVisibility();
    const handleScroll = () => {
      updateButtonVisibility();
    };
    const handleResize = () => {
      updateButtonVisibility();
    };
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [setShowNavRightButton]);

  return (
    <div className={styles.root}>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        {children}
      </div>
      {showNavRightButton ? (
        <button
          className={styles.scrollRight}
          onClick={() => {
            const container = scrollContainerRef.current;
            if (!container) {
              return;
            }

            const childrenArray = Array.from(container.children) as HTMLElement[];
            const { scrollLeft, clientWidth } = container;

            for (const child of childrenArray) {
              const childLeft = child.offsetLeft;
              const childRight = childLeft + child.offsetWidth;
              const visibleRight = scrollLeft + clientWidth;

              const PX_THRESHOLD = 80;

              if (childRight - PX_THRESHOLD > visibleRight) {
                container.scrollTo({ left: childLeft, behavior: 'smooth' });
                return;
              }
            }
            container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor" />
          </svg>
        </button>
      ) : null}
    </div>
  );
};
