import { fetchSanityData } from '@/sanity/client';
import { Layout } from '@/modules/layout/layout';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { Card, CardContainer } from '@/visual-components/card/card';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';

const SERVICES_QUERY = `
  *[_type== "service"]{
    title,
    description,
    linkTarget,
    "imageUrl": image.asset->url,
    order
  } | order(order asc)
  `;

function getLink(linkTarget: string): { href: string; text: string } {
  switch (linkTarget) {
    case 'contact':
      return {
        href: '/contact',
        text: 'Kontakt',
      };
    case 'stock':
      return {
        href: '/stock',
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
    default:
      return {
        href: '/contact',
        text: 'Kontakt',
      };
  }
}

export default async function Services() {
  const services = await fetchSanityData<
    {
      title: string;
      description: string;
      linkTarget: string;
      imageUrl: string;
    }[]
  >(SERVICES_QUERY);

  return (
    <Layout activePath="/services">
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
