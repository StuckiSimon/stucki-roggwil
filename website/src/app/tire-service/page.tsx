import type { Metadata } from 'next';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Spacer } from '@/visual-components/spacer/spacer';
import { Fact } from '@/visual-components/fact/fact';
import { ButtonLink } from '@/visual-components/button/button';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment';
import { FactGrid } from '@/visual-components/fact-grid/fact-grid';
import { SectionLead } from '@/visual-components/section-lead/section-lead';
import { usePathBuilder } from '@/core/router/use-path-builder';

export const metadata: Metadata = {
  title: 'Alles rund um Reifen | Garage Stucki AG',
  description:
    'Reifenservice in Roggwil: Reifenwechsel, Einlagerung & Reparatur. Vertrauen Sie auf unsere Expertise. Jetzt Termin vereinbaren!',
};

export default async function TireService() {
  const { contactPath } = usePathBuilder();

  return (
    <Layout>
      <PageHero title="Reifenservice" subline="Volle Fahrt voraus mit unseren Reifenservices." />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <SectionLead
            lead="Alle Dienstleistungen rund um Ihre Reifen"
            leadText="Ob Reifenwechsel, Einlagerung oder Reparatur – wir bieten Ihnen umfassende Services, damit Sie sicher und komfortabel unterwegs sind."
          />
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactGrid>
            <Fact
              id={1}
              title="Wechsel"
              description="Saisonaler Wechsel zwischen Sommer- und Winterreifen für optimale Sicherheit."
            />
            <Fact
              id={2}
              title="Einlagerung"
              description="Damit Ihre Reifen in bestem Zustand bleiben, wenn sie nicht gebraucht werden."
            />
            <Fact
              id={3}
              title="Reparatur"
              description="Schnelle und fachgerechte Reparaturen, um Ihre Reifen wieder fit zu machen."
            />
            <Fact
              id={4}
              title="Beratung"
              description="Individuelle Beratung zur Auswahl der passenden Reifen für Ihr Fahrzeug."
            />
            <Fact
              id={5}
              title="Kauf"
              description="Breite Auswahl an hochwertigen Reifenmarken zu attraktiven Preisen."
            />
            <Fact
              id={6}
              title="Radwechsel"
              description="Professioneller Wechsel von Kompletträdern für maximale Sicherheit und Komfort."
            />
          </FactGrid>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <CallToActionFragment
            title="Jetzt Termin vereinbaren"
            text="Am 25. Oktober und 8. November finden unsere beliebten Reifenwechsel-Samstage statt."
          >
            <ButtonLink href={contactPath()}>Kontaktieren Sie uns</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
