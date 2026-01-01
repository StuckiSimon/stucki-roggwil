import type { Metadata } from 'next';
import { fetchSanityData } from '@/sanity/client';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Spacer } from '@/visual-components/spacer/spacer';
import { FactList } from '@/visual-components/fact-list-scrollable/fact-list';
import { Fact } from '@/visual-components/fact/fact';
import { ButtonLink } from '@/visual-components/button/button';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment';
import { RentalTeaser } from '@/visual-components/rental-teaser/rental-teaser';
import { LeasingTeaserLayout } from '@/visual-components/leasing-teaser-layout/leasing-teaser-layout';
import { SectionLead } from '@/visual-components/section-lead/section-lead';

export const metadata: Metadata = {
  title: 'Fahrzeugvermietung | Garage Stucki AG',
  description:
    'Mieten Sie einen Transporter oder Kleinbus bei der Garage Stucki AG in Roggwil. Flexible Mietdauer, faire Konditionen und top gewartete Fahrzeuge.',
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
      <PageHero title="Fahrzeugvermietung" subline="Mieten Sie einen Transporter oder Kleinbus bei uns." />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <SectionLead
            lead="Ihre Vorteile bei der Fahrzeugmiete"
            leadText="Flexibel, unkompliziert und passend für Ihren Bedarf – mieten Sie einen Transporter oder Kleinbus einfach bei uns."
          />
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactList>
            <Fact
              id={1}
              title="Flexible Mietdauer"
              description="Flexible Mietdauer: Wählen Sie die Mietdauer nach Ihrem Bedarf – tageweise oder länger."
            />
            <Fact
              id={2}
              title="Faire Konditionen"
              description="Transparente Preise ohne versteckte Kosten – nur 200.– CHF Kaution und 1'000.– CHF Selbstbehalt."
            />
            <Fact
              id={3}
              title="Top gewartete Fahrzeuge"
              description="Unsere Mietfahrzeuge sind regelmässig geprüft und in einwandfreiem Zustand."
            />
            <Fact
              id={4}
              title="Individuelle Beratung"
              description="Wir finden gemeinsam und unkompliziert das passende Fahrzeug für Ihren Transport."
            />
          </FactList>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <SectionLead lead="Unsere Mietfahrzeuge" leadText="Das passende Fahrzeug für Ihren Transportbedarf." />
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
            <ButtonLink href="/contact">Jetzt unverbindlich anfragen</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
