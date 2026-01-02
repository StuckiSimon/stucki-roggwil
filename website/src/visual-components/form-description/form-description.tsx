import React from 'react';
import { Typography } from '@/visual-components/typography/typography.tsx';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';

type Props = {
  title: string;
  description: string;
};

export const FormDescription: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <Typography variant="title-3" color="blue">
        {title}
      </Typography>
      <Spacer size="03" />
      <Typography>{description}</Typography>
    </>
  );
};
