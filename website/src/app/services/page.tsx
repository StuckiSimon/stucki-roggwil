import type { Metadata } from 'next';
import { fetchSanityData } from '@/sanity/client';
import { Layout } from '@/modules/layout/layout';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { Card, CardContainer } from '@/visual-components/card/card';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { usePathBuilder } from '@/core/router/use-path-builder';
import { useServiceLinks } from '@/modules/services/use-service-links.ts';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment.tsx';
import { ButtonLink } from '@/visual-components/button/button.tsx';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';

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

  const { servicesPath, contactPath } = usePathBuilder();

  const { getLink } = useServiceLinks();

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
        <GridItem>
          <Spacer size="09" />
          <CallToActionFragment
            title="Sie benötigen weitere Informationen?"
            text="Kontaktieren Sie uns – wir helfen Ihnen gerne weiter."
          >
            <ButtonLink href={contactPath()}>Kontaktieren Sie uns</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
