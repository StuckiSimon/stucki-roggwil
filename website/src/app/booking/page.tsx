import type { Metadata } from 'next';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Spacer } from '@/visual-components/spacer/spacer';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment';
import { ButtonLink } from '@/visual-components/button/button';
import { SectionLead } from '@/visual-components/section-lead/section-lead.tsx';
import { FactList } from '@/visual-components/fact-list-scrollable/fact-list.tsx';
import { Fact } from '@/visual-components/fact/fact.tsx';
import { CtaPictoLink } from '@/visual-components/cta-picto-link/cta-picto-link.tsx';
import { usePathBuilder } from '@/core/router/use-path-builder';
import { CtaPictoLinkGrid } from '@/visual-components/cta-picto-link-grid/cta-picto-link-grid.tsx';

export const metadata: Metadata = {
  title: 'Online Buchung – Garage Stucki AG',
  description:
    'Buchen Sie Ihre Dienstleistung direkt online. Schnell, einfach und zuverlässig – reservieren Sie jetzt Ihren Termin!',
};

export default async function OnlineBooking() {
  const { contactPath, bookingServicePath } = usePathBuilder();

  return (
    <Layout>
      <PageHero title="Online Buchung" subline="Schnell und einfach Termin abmachen" />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <SectionLead lead="So funktionierts" leadText="In 3 Schritten zum Termin – weiter unten geht's direkt los." />
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactList>
            <Fact
              id={1}
              title="Dienstleistung auswählen"
              description="Benötigen Sie Service, Radwechsel oder steht die nächste MFK-Prüfung an? Wählen Sie die gewünschte Dienstleistung einfach aus."
            />
            <Fact
              id={2}
              title="Termin festlegen"
              description="Wählen Sie Datum und Uhrzeit, die Ihnen am besten passen. Unser Kalender zeigt Ihnen die verfügbaren Termine an."
            />
            <Fact
              id={3}
              title="Kontaktdaten angeben"
              description="Geben Sie Ihre Kontaktdaten ein, damit wir Ihre Buchung bestätigen und Sie bei Bedarf kontaktieren können."
            />
          </FactList>
        </GridItem>
        <GridItem span="6">
          <Spacer size="09" />
          <SectionLead
            lead="Welche Dienstleistung benötigen Sie?"
            leadText="Wählen Sie die gewünschte Dienstleistung aus"
          />
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <CtaPictoLinkGrid>
            <CtaPictoLink
              picto="picto-wrench-in-circle"
              href={bookingServicePath('service')}
              title="Service"
              description="Regelmässige Wartung und Inspektion Ihres Fahrzeugs"
            />
            <CtaPictoLink
              picto="picto-tire"
              href={bookingServicePath('tire-change')}
              title="Radwechsel"
              description="Saisonaler Wechsel zwischen Sommer- und Winterreifen"
            />
            <CtaPictoLink
              picto="picto-vehicle-check-list"
              href={bookingServicePath('vehicle-check')}
              title="Check"
              description="Saisonabhängige Checks – egal welches Wetter kommt"
            />
            <CtaPictoLink
              picto="picto-vehicle-on-lift"
              href={bookingServicePath('motor-vehicle-inspection')}
              title="MFK-Prüfung"
              description="Durchführung der MFK-Prüfung bei Aufgebot des Strassen&shy;verkehrsamts"
            />
          </CtaPictoLinkGrid>
        </GridItem>
        <GridItem>
          <Spacer size="09" />
          <CallToActionFragment
            title="Nicht die passende Dienstleistung?"
            text="Melden Sie sich bei uns – auch bei Fällen wie Lackschäden, grösseren Arbeiten oder Notfällen sind wir für Sie da."
          >
            <ButtonLink href={contactPath()}>Kontaktieren Sie uns</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
