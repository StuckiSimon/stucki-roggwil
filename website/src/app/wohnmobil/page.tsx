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
import { LeasingTeaserLayout } from '@/visual-components/leasing-teaser-layout/leasing-teaser-layout';
import { SectionLead } from '@/visual-components/section-lead/section-lead';
import { usePathBuilder } from '@/core/router/use-path-builder';
import { MotorhomeTeaser } from '@/visual-components/motorhome-teaser/motorhome-teaser';

export const metadata: Metadata = {
  title: 'Wohnmobil kaufen | Garage Stucki AG',
  description:
    'Entdecken Sie unsere Wohnmobile im Verkauf bei der Garage Stucki AG in Roggwil. Gepflegte Fahrzeuge mit transparenter Historie.',
};

const MOTORHOME_VEHICLES_QUERY = `
  *[_type == "motorhomeVehicle"]{
    name,
    initialRegistrationMonth,
    initialRegistrationYear,
    mileageKm,
    priceChf,
    seatCount,
    sleepingPlaceCount,
    "imageUrl": image.asset->url
  } | order(order asc)
`;

export default async function MotorhomePage() {
  const { contactPath } = usePathBuilder();
  const vehicles = await fetchSanityData<
    {
      name: string;
      initialRegistrationMonth: number;
      initialRegistrationYear: number;
      mileageKm: number;
      priceChf: number;
      seatCount: number;
      sleepingPlaceCount: number;
      imageUrl: string;
    }[]
  >(MOTORHOME_VEHICLES_QUERY);

  return (
    <Layout>
      <PageHero title="Wohnmobil kaufen" subline="Finden Sie Ihr passendes Wohnmobil aus unserem aktuellen Verkauf." />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <SectionLead
            lead="Ihre Vorteile beim Wohnmobilkauf bei uns"
            leadText="Persönliche Beratung und gepflegte Fahrzeuge direkt vor Ort."
          />
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactList>
            <Fact
              id={1}
              title="Geprüfte Fahrzeuge"
              description="Unsere Fahrzeuge werden sorgfältig geprüft, damit Sie sicher und entspannt starten können."
            />
            <Fact
              id={2}
              title="Persönliche Beratung"
              description="Wir helfen Ihnen bei der Auswahl des passenden Wohnmobils für Ihre Reisepläne."
            />
            <Fact
              id={3}
              title="Direkter Kontakt"
              description="Schnell und unkompliziert – kontaktieren Sie uns direkt für Besichtigung und Fragen."
            />
          </FactList>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <SectionLead lead="Unsere Wohnmobile im Verkauf" leadText="Aktuell verfügbare Fahrzeuge auf einen Blick." />
          <Spacer size="09" />
        </GridItem>
        <GridItem span="8" spanTablet="6">
          <LeasingTeaserLayout>
            {vehicles.result.map((item) => (
              <MotorhomeTeaser
                key={item.name}
                imageUrl={item.imageUrl}
                name={item.name}
                initialRegistrationMonth={item.initialRegistrationMonth}
                initialRegistrationYear={item.initialRegistrationYear}
                mileageKm={item.mileageKm}
                priceChf={item.priceChf}
                seatCount={item.seatCount}
                sleepingPlaceCount={item.sleepingPlaceCount}
              />
            ))}
          </LeasingTeaserLayout>
        </GridItem>
        <GridItem>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <CallToActionFragment
            title="Interesse an einem Wohnmobil?"
            text="Kontaktieren Sie uns für eine Besichtigung oder eine persönliche Beratung."
          >
            <ButtonLink href={contactPath()}>Jetzt anfragen</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
