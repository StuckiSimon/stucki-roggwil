import { Layout } from '@/modules/layout/layout';
import styles from './page.module.scss';
import { Typography } from '@/visual-components/typography/typography';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { ButtonLink } from '@/visual-components/button/button';
import { fetchSanityData } from '@/sanity/client';
import { notNil } from '@/core/util/is-nil';
import Link from 'next/link';
import { usePathBuilder } from '@/core/router/use-path-builder';

const HOME_QUERY = `
  *[_type == "homeTeaser" && isActive == true][0]{
    "ctaText": ctaText,
    "assetUrl": asset->pdfFile.asset->url,
    linkTarget
  }
  `;

export default async function Home() {
  const { servicesPath, contactPath, mechJobPath, allInclusiveLeasingPath, springExhibitionPath } = usePathBuilder();
  const homeTeasers = await fetchSanityData<{
    ctaText: string;
    assetUrl?: string;
    linkTarget?: string;
  }>(HOME_QUERY);

  const LINK_TARGET_MAP = {
    job: mechJobPath(),
    'all-inclusive-leasing': allInclusiveLeasingPath(),
    'spring-exhibition': springExhibitionPath(),
  };

  const teaser = homeTeasers.result;
  const hasTeaser = notNil(teaser);

  return (
    <Layout>
      <div className={styles.root}>
        <GridContainer>
          <GridItem>
            <div className={styles.container}>
              <div className={styles.question}>Auto?</div>
              <div className={styles.answer}>Auto.</div>
              <Typography variant="sub-title" color="white">
                Wir sind die Antwort auf Ihre Fragen.
              </Typography>
              <div className={styles.buttonContainer}>
                <ButtonLink href={servicesPath()} accent>
                  Dienstleistungen
                </ButtonLink>
                <ButtonLink href={contactPath()} accent secondary>
                  Kontakt
                </ButtonLink>
              </div>
            </div>
          </GridItem>
          {hasTeaser ? (
            <GridItem>
              <Link
                className={styles.teaser}
                href={teaser.assetUrl ?? LINK_TARGET_MAP[teaser.linkTarget as keyof typeof LINK_TARGET_MAP] ?? '#'}
              >
                <span className={styles.teaserText}>{teaser.ctaText}</span>
              </Link>
            </GridItem>
          ) : null}
        </GridContainer>
      </div>
    </Layout>
  );
}
