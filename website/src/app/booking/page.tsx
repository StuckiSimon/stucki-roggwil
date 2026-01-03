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
import { useServiceTypes } from '@/modules/booking/service/use-service-types.ts';

export const metadata: Metadata = {
  title: 'Online Buchung – Garage Stucki AG',
  description:
    'Service, Radwechsel, MFK-Prüfung und Fahrzeug-Check bequem online buchen bei Garage Stucki AG. Jetzt Termin reservieren – schnell und unkompliziert.',
};

export default async function OnlineBooking() {
  const { contactPath } = usePathBuilder();
  const { list: ctaPictoLinks } = useServiceTypes();

  return (
    <Layout>
      <PageHero title="Online Buchung" subline="Ihren Termin in wenigen Schritten online vereinbaren" />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <SectionLead
            lead="So funktionierts"
            leadText="In nur drei Schritten zu Ihrem Termin – starten Sie unten direkt mit Ihrer Buchung."
          />
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <FactList>
            <Fact
              id={1}
              title="Dienstleistung auswählen"
              description="Brauchen Sie einen Service, einen Radwechsel oder steht die nächste MFK-Prüfung bevor? Definieren Sie die passende Dienstleistung."
            />
            <Fact
              id={2}
              title="Termin festlegen"
              description="Wählen Sie das für Sie passende Datum und die Uhrzeit aus. Unser Kalender zeigt Ihnen alle verfügbaren Termine."
            />
            <Fact
              id={3}
              title="Kontaktdaten angeben"
              description="Tragen Sie Ihre Kontaktdaten ein, damit wir Ihre Buchung bestätigen und Sie bei Rückfragen erreichen können."
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
            {ctaPictoLinks.map((link) => (
              <CtaPictoLink
                key={link.picto}
                picto={link.picto}
                href={link.href}
                title={link.title}
                description={link.description}
              />
            ))}
          </CtaPictoLinkGrid>
        </GridItem>
        <GridItem>
          <Spacer size="09" />
          <CallToActionFragment
            title="Ihre gewünschte Dienstleistung ist nicht dabei?"
            text="Kontaktieren Sie uns – auch bei Fällen wie Lackschäden, grösseren Reparaturen oder Notfällen helfen wir Ihnen gerne weiter."
          >
            <ButtonLink href={contactPath()}>Kontaktieren Sie uns</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
