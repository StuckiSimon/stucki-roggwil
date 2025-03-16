'use client';
import React, { useEffect } from 'react';

type Props = {
  htmlSelector: string;
  className: string;
};

export const HeaderScrollHandler: React.FC<Props> = ({ htmlSelector, className }) => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(htmlSelector);
      if (header) {
        header.classList.toggle(className, window.scrollY > 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [className, htmlSelector]);

  return null;
};
