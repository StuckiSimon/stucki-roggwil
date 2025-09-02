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
import { LeasingTeaser } from '@/visual-components/leasing-teaser/leasing-teaser';
import { LeasingTeaserLayout } from '@/visual-components/leasing-teaser-layout/leasing-teaser-layout';

export const metadata: Metadata = {
  title: 'All Inclusive Leasing | Garage Stucki AG',
  description:
    'Entdecken Sie unser All-Inclusive Leasing-Angebot für sorgenfreie Elektromobilität. Inklusive Reifen, Service und mehr.',
};

const ALL_INCLUSIVE_LEASING_VEHICLES_QUERY = `
  *[_type == "allInclusiveLeasingVehicle"] {
    ...,
    vehicle-> {
      ...,
      "imageUrl": image.asset->url
    }
  } | order(order asc)
  `;

export default async function AllInclusiveLeasing() {
  const vehicles = await fetchSanityData<
    {
      leasingDurationMonths: number;
      monthlyLeasingRate: number;
      totalKm: number;
      vehicle: {
        title: string;
        description: string;
        detailsUrl: string;
        imageUrl: string;
      };
    }[]
  >(ALL_INCLUSIVE_LEASING_VEHICLES_QUERY);

  return (
    <Layout>
      <PageHero title="All-Inclusive Leasing" subline="Sie wollen Elektromobilität ohne Risiko entdecken?" />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <Typography variant="title-3" color="blue">
            7 Vorteile bei einem All-Inclusive Leasing mit uns
          </Typography>
          <Spacer size="03" />
          <Typography variant="text">
            Erfahren Sie, weshalb das All-Inclusive Leasing Ihr perfekter Einstieg in die Elektromobilität ist.
          </Typography>
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactList>
            <Fact
              id={1}
              title="Wallbox Installation"
              description="Wir beteiligen uns mit bis zu 1'000.– CHF an den Installationskosten für eine Wallbox bei Ihnen zu Hause."
            />
            <Fact
              id={2}
              title="Alles dabei"
              description="Wir übernehmen Kosten für Reifen, Service, Garantieabwicklung und vieles mehr."
            />
            <Fact
              id={3}
              title="Kalkulierbar"
              description="Keine versteckten Kosten, keine Überraschungen – perfekt für ein klares Budget."
            />
            <Fact
              id={4}
              title="Kein Restwertrisiko"
              description="Durch das Leasing entfällt das Restwertrisiko für Sie."
            />
            <Fact
              id={5}
              title="Individuell"
              description="Wählen Sie die Leasingdauer und Kilometerleistung, die zu Ihrem Lebensstil passt."
            />
            <Fact
              id={6}
              title="Vertrauen"
              description="Profitieren Sie von unserer 30-jährigen Erfahrung und unserem umfassenden Service."
            />
            <Fact
              id={7}
              title="Umweltbewusst"
              description="Fahren Sie ein Elektrofahrzeug und leisten Sie einen Beitrag zur Reduzierung von Emissionen."
            />
          </FactList>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <Typography variant="title-3" color="blue">
            Unsere All-Inclusive Fahrzeuge
          </Typography>
          <Spacer size="03" />
          <Typography variant="text">Wir haben das passende Angebot für Ihr Nutzungsprofil.</Typography>
          <Spacer size="09" />
        </GridItem>
        <GridItem span="8" spanTablet="6">
          <LeasingTeaserLayout>
            {vehicles.result.map((item) => (
              <LeasingTeaser
                key={item.vehicle.detailsUrl}
                detailsUrl={item.vehicle.detailsUrl}
                imageUrl={item.vehicle.imageUrl}
                title={item.vehicle.title}
                description={item.vehicle.description}
                leasingDurationMonths={item.leasingDurationMonths}
                monthlyLeasingRate={item.monthlyLeasingRate}
                totalKm={item.totalKm}
              />
            ))}
          </LeasingTeaserLayout>
        </GridItem>
        <GridItem>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <CallToActionFragment
            title="Nicht das passende Fahrzeug dabei?"
            text="Gerne liefern wir Ihnen mehr Informationen zu einem All-Inclusive Leasing für ein anderes Fahrzeug."
          >
            <ButtonLink href="/contact">Kontaktieren Sie uns</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
