import React from 'react';
import { Typography } from '@/visual-components/typography/typography.tsx';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';

type Props = {
  lead: string;
  leadText: string;
};

export const SectionLead: React.FC<Props> = ({ lead, leadText }) => {
  return (
    <>
      <Typography variant="title-3" color="blue">
        {lead}
      </Typography>
      <Spacer size="03" />
      <Typography variant="text">{leadText}</Typography>
    </>
  );
};
