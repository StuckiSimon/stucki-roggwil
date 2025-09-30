import type { Metadata } from 'next';
import { fetchSanityData } from '@/sanity/client';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import { FactList } from '@/visual-components/fact-list/fact-list';
import { Fact } from '@/visual-components/fact/fact';
import { ButtonLink } from '@/visual-components/button/button';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment';
import { RentalTeaser } from '@/visual-components/rental-teaser/rental-teaser';
import { LeasingTeaserLayout } from '@/visual-components/leasing-teaser-layout/leasing-teaser-layout';

export const metadata: Metadata = {
  title: 'Fahrzeugvermietung | Garage Stucki AG',
  description:
    'Mieten Sie Transporter und Kleinbusse bei der Garage Stucki AG in Roggwil. Flexible Mietdauer, faire Konditionen und top gewartete Fahrzeuge.',
};

const RENTAL_VEHICLES_QUERY = `
  *[_type == "rentalVehicle"] {
    ...,
    vehicle-> {
      ...,
      "imageUrl": image.asset->url
    }
  } | order(order asc)
  `;

export default async function VehicleRent() {
  const vehicles = await fetchSanityData<
    {
      dailyRate: number;
      additionalKmRate: number;
      vehicle: {
        title: string;
        description: string;
        imageUrl: string;
      };
    }[]
  >(RENTAL_VEHICLES_QUERY);

  return (
    <Layout>
      <PageHero title="Fahrzeugvermietung" subline="Mieten Sie Transporter und Kleinbusse bei uns." />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <Typography variant="title-3" color="blue">
            Ihre Vorteile bei der Fahrzeugmiete
          </Typography>
          <Spacer size="03" />
          <Typography variant="text">
            Flexibel, unkompliziert und passend für Ihren Bedarf – mieten Sie Transporter oder Kleinbusse einfach bei
            uns.
          </Typography>
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactList>
            <Fact
              id={1}
              title="Flexible Mietdauer"
              description="Mieten Sie Fahrzeuge tageweise – ganz nach Ihrem Bedarf."
            />
            <Fact
              id={2}
              title="Faire Konditionen"
              description="Transparente Preise ohne versteckte Kosten. Kaution von 200.– CHF sowie Selbstbehalt von 1'000.– CHF."
            />
            <Fact
              id={3}
              title="Top gewartete Fahrzeuge"
              description="Unsere Mietfahrzeuge sind stets geprüft und gepflegt."
            />
            <Fact
              id={4}
              title="Individuelle Beratung"
              description="Wir helfen Ihnen, das passende Fahrzeug für Ihren Einsatzzweck zu finden."
            />
          </FactList>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <Typography variant="title-3" color="blue">
            Unsere Mietfahrzeuge
          </Typography>
          <Spacer size="03" />
          <Typography variant="text">Das passende Fahrzeug für Ihren Transportbedarf.</Typography>
          <Spacer size="09" />
        </GridItem>
        <GridItem span="8" spanTablet="6">
          <LeasingTeaserLayout>
            {vehicles.result.map((item, idx) => (
              <RentalTeaser
                key={idx}
                imageUrl={item.vehicle.imageUrl}
                title={item.vehicle.title}
                description={item.vehicle.description}
                dailyRate={item.dailyRate}
                additionalKm={item.additionalKmRate}
              />
            ))}
          </LeasingTeaserLayout>
        </GridItem>
        <GridItem>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <CallToActionFragment
            title="Fragen zur Fahrzeugmiete?"
            text="Kontaktieren Sie uns für eine individuelle Beratung oder ein Angebot."
          >
            <ButtonLink href="/contact">Kontaktieren Sie uns</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
