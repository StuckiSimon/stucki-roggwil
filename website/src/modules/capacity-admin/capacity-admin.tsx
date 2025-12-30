'use client';
import React, { useState } from 'react';
import { z, ZodError } from 'zod';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { useAdminPassword } from '@/modules/admin-layout/useAdminPassword';
import { CapacityExcelReader } from '@/modules/capacity-admin/capacity-excel-reader';
import { capacityRecordSchema } from '@/modules/capacity-admin/services/schemas';
import { mapCapacityRecordToCapacityEntry } from '@/modules/capacity-admin/services/mapCapacityRecordToCapacityEntry';
import { CapacityEntry } from '@/modules/capacity-admin/types';
import isNil, { notNil } from '@/core/util/is-nil';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import { CapacityUpdater } from '@/modules/capacity-admin/capacity-updater';

export const CapacityAdmin: React.FC = () => {
  const { hasSetAdminPassword } = useAdminPassword();
  const [parseResult, setParseResult] = useState<
    | {
        success: true;
        data: CapacityEntry[];
      }
    | {
        success: false;
        errors: ZodError[];
      }
    | null
  >(null);

  if (!hasSetAdminPassword) {
    return null;
  }
  const onDataParsed = (data: unknown) => {
    const parseResult = z.array(capacityRecordSchema).safeParse(data);

    if (!parseResult.success) {
      setParseResult({
        success: false,
        errors: [parseResult.error],
      });
      return;
    }

    const parsedData = parseResult.data.map((record) => mapCapacityRecordToCapacityEntry(record));
    setParseResult({
      success: true,
      data: parsedData,
    });
  };

  return (
    <GridContainer>
      <GridItem>
        <CapacityExcelReader onDataParsed={onDataParsed} />
        <Spacer size="07" />
      </GridItem>
      {(notNil(parseResult) && parseResult.success) || isNil(parseResult) ? (
        <GridItem>
          <CapacityUpdater unfilteredEntries={parseResult?.data || null} />
        </GridItem>
      ) : null}
      {notNil(parseResult) && !parseResult.success ? (
        <GridItem span="6">
          <Typography variant="title-3">🔴 Fehler beim lesen der Datei</Typography>
          <Typography>
            Bitte überprüfe, dass die Datei dem erwarteten Format entspricht. Es wird erwartet eine Datei mit den
            Spalten begindat (Datum) und tagdauer (Kapazitätsstunden) erwartet.
          </Typography>
          <Spacer size="03" />
          {parseResult.errors.map((error, index) => (
            <div key={index}>
              <pre>{error.message}</pre>
            </div>
          ))}
          <Spacer size="05" />
        </GridItem>
      ) : null}
    </GridContainer>
  );
};
