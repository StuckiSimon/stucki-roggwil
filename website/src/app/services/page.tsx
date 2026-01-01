import type { Metadata } from 'next';
import { fetchSanityData } from '@/sanity/client';
import { Layout } from '@/modules/layout/layout';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { Card, CardContainer } from '@/visual-components/card/card';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { usePathBuilder } from '@/core/router/use-path-builder';

export const metadata: Metadata = {
  title: 'Dienstleistungen | Garage Stucki AG',
  description:
    'Rundum-Service in Roggwil: Reifen wechseln, Neu-/Gebrauchtwagen finden & Mietwagen buchen. Jetzt informieren!',
};

const SERVICES_QUERY = `
  *[_type== "service"]{
    title,
    description,
    linkTarget,
    "imageUrl": image.asset->url,
    order
  } | order(order asc)
  `;

export default async function Services() {
  const services = await fetchSanityData<
    {
      title: string;
      description: string;
      linkTarget: string;
      imageUrl: string;
    }[]
  >(SERVICES_QUERY);

  const {
    servicesPath,
    stockPath,
    allInclusiveLeasingPath,
    tireServicePath,
    vehicleRentPath,
    reasonsForPath,
    contactPath,
  } = usePathBuilder();

  function getLink(linkTarget: string): { href: string; text: string } {
    switch (linkTarget) {
      case 'contact':
        return {
          href: contactPath(),
          text: 'Kontakt',
        };
      case 'stock':
        return {
          href: stockPath(),
          text: 'Angebot',
        };
      case 'freizeitmobile':
        return {
          href: 'https://www.freizeitmobilestucki.ch',
          text: 'freizeitmobilestucki.ch',
        };
      case 'kgm-models':
        return {
          href: 'https://stucki-roggwil.kgm.ch/brochures-and-pricelists/',
          text: 'KGM Modelle',
        };
      case 'all-inclusive-leasing':
        return {
          href: allInclusiveLeasingPath(),
          text: 'All-Inclusive Leasing',
        };
      case 'tire-service':
        return {
          href: tireServicePath(),
          text: 'Reifenservice',
        };
      case 'rental':
        return {
          href: vehicleRentPath(),
          text: 'Autovermietung',
        };
      case 'why-stucki':
        return {
          href: reasonsForPath(),
          text: 'Wieso Stucki AG?',
        };
      default:
        return {
          href: contactPath(),
          text: 'Kontakt',
        };
    }
  }

  return (
    <Layout activePath={servicesPath()}>
      <PageHero title="Was können wir für Sie tun?" subline="Wir sind die Antwort auf Ihre Fragen." />
      <GridContainer>
        <GridItem>
          <CardContainer>
            {services.result.map((service) => (
              <Card
                key={service.title}
                title={service.title}
                image={service.imageUrl}
                text={service.description}
                cta={getLink(service.linkTarget)}
              />
            ))}
          </CardContainer>
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
