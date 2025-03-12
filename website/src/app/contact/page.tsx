import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Typography } from '@/visual-components/typography/typography';
import positionImg from './position.png';
import styles from './page.module.scss';

export default async function Contact() {
  return (
    <Layout>
      <PageHero title="Kontakt" subline="So erreichen Sie uns." />
      <div className={styles.space}></div>
      <GridContainer>
        <GridItem span="9" createSubgrid>
          <GridItem span="3">
            <Typography variant="buttontext">Adresse</Typography>
            <Typography variant="text">
              Garage Stucki AG
              <br />
              St. Urbanstrasse 35
              <br />
              4914 Roggwil (BE)
            </Typography>
          </GridItem>
          <GridItem span="3">
            <Typography variant="buttontext">Kontakt</Typography>
            <Typography variant="text">
              <a href="tel:+410629290505">062 929 05 05</a>
              <br />
              <a href="mailto:info@stucki-roggwil.ch">info@stucki-roggwil.ch</a>
            </Typography>
          </GridItem>
          <GridItem span="7">
            <div className={styles.space}></div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Garage%20Stucki%20AG%2C%20Sankt%20Urbanstrasse%2035%2C%204914%20Roggwil"
              target="_blank"
            >
              <img src={positionImg.src} alt="" />
            </a>
          </GridItem>
        </GridItem>
        <GridItem span="3">
          <Typography variant="sub-title" color="blue">
            Öffnungszeiten
          </Typography>
          <Typography variant="buttontext">Mo - Fr</Typography>
          <Typography variant="text">
            06:30 - 12:00
            <br />
            13:30 - 18:00
          </Typography>
          <Typography variant="buttontext">Sa</Typography>
          <Typography variant="text">nach Absprache</Typography>
          <Typography variant="buttontext">So</Typography>
          <Typography variant="text">geschlossen</Typography>
        </GridItem>
      </GridContainer>
      <div className={styles.space}></div>
    </Layout>
  );
}
