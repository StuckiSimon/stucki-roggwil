import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import positionImg from './position.png';

export default async function Contact() {
  return (
    <Layout activePath="/contact">
      <PageHero title="Kontakt" subline="So erreichen Sie uns." />
      <Spacer size="08" />
      <GridContainer>
        <GridItem span="8" createSubgrid>
          <GridItem span="3">
            <Typography variant="buttontext">Adresse</Typography>
            <Spacer size="04" />
            <Typography variant="text">
              Garage Stucki AG
              <Spacer size="02" />
              St. Urbanstrasse 35
              <Spacer size="02" />
              4914 Roggwil (BE)
            </Typography>
          </GridItem>
          <GridItem span="3">
            <Spacer size="00" sizeXs="06" />
            <Typography variant="buttontext">Kontakt</Typography>
            <Spacer size="04" />
            <Typography variant="text">
              <a href="tel:+410629290505">062 929 05 05</a>
              <Spacer size="02" />
              <a href="mailto:info@stucki-roggwil.ch">info@stucki-roggwil.ch</a>
            </Typography>
          </GridItem>
          <GridItem span="7">
            <Spacer size="08" />
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Garage%20Stucki%20AG%2C%20Sankt%20Urbanstrasse%2035%2C%204914%20Roggwil"
              target="_blank"
            >
              <img src={positionImg.src} alt="" />
            </a>
            <Spacer size="08" />
          </GridItem>
        </GridItem>
        <GridItem span="4">
          <Typography variant="sub-title" color="blue">
            Öffnungszeiten
          </Typography>
          <Spacer size="05" />
          <Typography variant="buttontext">Mo - Fr</Typography>
          <Spacer size="03" />
          <Typography variant="text">
            07:30 - 12:00
            <Spacer size="02" />
            13:30 - 18:00
          </Typography>
          <Spacer size="05" />
          <Typography variant="buttontext">Sa</Typography>
          <Spacer size="03" />
          <Typography variant="text">nach Absprache</Typography>
          <Spacer size="05" />
          <Typography variant="buttontext">So</Typography>
          <Spacer size="03" />
          <Typography variant="text">geschlossen</Typography>
          <Spacer size="08" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
