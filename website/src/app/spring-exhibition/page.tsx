import type { Metadata } from 'next';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment';
import { ButtonLink } from '@/visual-components/button/button';
import { SectionLead } from '@/visual-components/section-lead/section-lead';
import { usePathBuilder } from '@/core/router/use-path-builder';

export const metadata: Metadata = {
  title: 'Frühlingsausstellung – 30 Jahre Garage Stucki AG während der Autoexpo Langenthal',
  description:
    'Feiern Sie mit uns 30 Jahre Garage Stucki AG! Besuchen Sie unsere Frühlingsausstellung während der Autoexpo Langenthal und entdecken Sie attraktive Angebote und Neuheiten.',
};

export default async function SpringExhibition() {
  const { contactPath } = usePathBuilder();

  return (
    <Layout>
      <PageHero title="Frühlings&shy;ausstellung 2026" subline="30 Jahre Garage Stucki AG" />
      <GridContainer>
        <GridItem span="6">
          <Spacer size="07" />
          <SectionLead
            lead="Feiern Sie mit uns 30 Jahre!"
            leadText="Wir feiern unser 30-jähriges Jubiläum! Besuchen Sie uns an der diesjährigen Autoexpo Langenthal und erleben Sie unsere Frühlingsausstellung mit vielen Highlights, attraktiven Jubiläumsangeboten und spannenden Neuheiten rund ums Auto."
          />
          <Spacer size="07" />
        </GridItem>
        <GridItem span="8">
          <Typography variant="buttontext">
            Datum: Samstag, 21. März bis Sonntag, 22. März 2026
            <Spacer size="04" />
            Ort: St. Urbanstrasse 35, 4914 Roggwil (BE)
          </Typography>
          <Spacer size="06" />
          <Typography variant="buttontext">Das erwartet Sie:</Typography>
          <Spacer size="03" />
          <ul>
            <li>
              <Typography>Exklusive Jubiläumsaktionen und Sonderangebote auf ausgewählte Fahrzeuge</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Präsentation der neuesten Modelle von KGM</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Persönliche Beratung durch unser erfahrenes Team</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Überraschungen für Gross und Klein</Typography>
            </li>
          </ul>
          <Spacer size="06" />
          <Typography>
            Wir freuen uns, dieses besondere Jubiläum gemeinsam mit Ihnen zu feiern und Sie bei uns begrüssen zu dürfen!
          </Typography>
          <Spacer size="07" />
        </GridItem>
        <GridItem>
          <CallToActionFragment
            title="Interesse geweckt?"
            text="Haben Sie Fragen zur Frühlingsausstellung oder möchten Sie einen Termin vereinbaren?"
          >
            <ButtonLink href={contactPath()}>Kontaktieren Sie uns</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
