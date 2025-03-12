import { Layout } from '@/modules/layout/layout';
import styles from './page.module.scss';
import { Typography } from '@/visual-components/typography/typography';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { ButtonLink } from '@/visual-components/button/button';

export default async function Home() {
  return (
    <Layout accent backdrop={<div className={styles.root}></div>}>
      <GridContainer>
        <GridItem>
          <div className={styles.container}>
            <div className={styles.question}>Auto?</div>
            <div className={styles.answer}>Auto.</div>
            <Typography variant="sub-title" color="white">
              Wir sind die Antwort auf Ihre Fragen.
            </Typography>
            <div className={styles.buttonContainer}>
              <ButtonLink href="/services" accent>
                Dienstleistungen
              </ButtonLink>
              <ButtonLink href="/contact" accent secondary>
                Kontakt
              </ButtonLink>
            </div>
          </div>
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
