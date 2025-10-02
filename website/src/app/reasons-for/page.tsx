import type { Metadata } from 'next';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import { Fact } from '@/visual-components/fact/fact';
import { ButtonLink } from '@/visual-components/button/button';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment';
import { FactGrid } from '@/visual-components/fact-grid/fact-grid';

export const metadata: Metadata = {
  title: 'Warum Garage Stucki? | Garage Stucki AG',
  description:
    'Entdecken Sie die Gründe, warum Sie sich für die Garage Stucki AG in Roggwil entscheiden sollten. Persönliche Beratung, Ford-Spezialist, offizielle KGM-Vertretung und umfassender Service.',
};

export default async function ReasonsFor() {
  return (
    <Layout>
      <PageHero title="Warum Garage Stucki?" subline="Ihre Vorteile bei uns auf einen Blick." />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <Typography variant="title-3" color="blue">
            Ihre Vorteile bei der Garage Stucki
          </Typography>
          <Spacer size="03" />
          <Typography variant="text">
            Wir sind Ihr zuverlässiger Partner rund ums Auto – mit persönlicher Beratung, langjähriger Erfahrung und
            umfassendem Service.
          </Typography>
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactGrid>
            <Fact
              id={1}
              title="Persönliche Beratung"
              description="Wir nehmen uns Zeit für Ihre Anliegen und finden gemeinsam und unkompliziert die beste Lösung für Sie."
            />
            <Fact
              id={2}
              title="Langjährige Erfahrung"
              description="Mit bald 30 Jahren Erfahrung als Ford-Spezialist und offizieller KGM-Vertretung sind wir Ihr kompetenter Ansprechpartner."
            />
            <Fact
              id={3}
              title="Umfassender Service"
              description="Ob Reparatur, Service, Reifenwechsel, Verkauf oder Vermietung – wir unterstützen Sie in allen Bereichen rund ums Auto."
            />
            <Fact
              id={4}
              title="Pannenhilfe inklusive"
              description="Als Servicekunde profitieren Sie gratis von der kostenlosen Pannenhilfe im In- und Ausland."
            />
            <Fact
              id={5}
              title="Transparente Preise"
              description="Faire und nachvollziehbare Preise – ohne versteckte Kosten. Bei uns gibt es keine Lockangebote."
            />
            <Fact
              id={6}
              title="Kundenorientierung"
              description="Ihre Zufriedenheit steht für uns an erster Stelle – darauf können Sie sich verlassen."
            />
            <Fact
              id={7}
              title="Moderne Infrastruktur"
              description="Unsere Werkstatt ist mit modernster Technik ausgestattet, damit wir Ihnen stets den besten Service für Autos aller Marken bieten können."
            />
            <Fact
              id={8}
              title="Regional verankert"
              description="Als Kunde unterstützen Sie nicht nur uns, sondern auch die lokale Wirtschaft und unser ausgeprägtes Engagement in der Region."
            />
            <Fact
              id={9}
              title="Allzeit informiert"
              description="Wir halten Sie auf unserer Webseite und in den sozialen Medien stets auf dem Laufenden, damit Sie frühzeitig planen können."
            />
          </FactGrid>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <Spacer size="09" />
        </GridItem>
        <GridItem>
          <CallToActionFragment
            title="Überzeugen Sie sich selbst!"
            text="Besuchen Sie uns in Roggwil oder kontaktieren Sie uns für eine persönliche Beratung. Wir freuen uns auf Sie."
          >
            <ButtonLink href="/contact">Jetzt Kontakt aufnehmen</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
