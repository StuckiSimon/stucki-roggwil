import type { Metadata } from 'next';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Typography } from '@/visual-components/typography/typography';
import { Spacer } from '@/visual-components/spacer/spacer';
import { Link } from '@/visual-components/link/link';

export const metadata: Metadata = {
  title: 'Automobil-Mechatroniker/in oder Automobil-Fachmann/-frau 100% | Garage Stucki AG',
  description:
    'Zur Verstärkung unseres Teams in Roggwil suchen wir per sofort oder nach Vereinbarung eine motivierte Persönlichkeit, die sich beruflich weiterentwickeln möchte',
};

export default async function MechJob() {
  return (
    <Layout>
      <script type="application/ld+json">
        {`{
          "@context" : "https://schema.org/",
          "@type" : "JobPosting",
          "title" : "Automobil-Mechatroniker/in oder Automobil-Fachmann/-frau 100%",
          "description" : "Klein aber fein: Die Garage Stucki AG ist ein langjährig etablierter Garagenbetrieb im Oberaargau. Dank unserer regionalen Verankerung und der Partnerschaft mit KGM/SsangYong und Le GARAGE bieten wir ein breites Spektrum an Leistungen. Unser Angebot umfasst Verkauf, Reparaturen und Servicearbeiten von Personenwagen, Lieferwagen und Wohnmobilen. Wir sind ein kompetenter und zuverlässiger Ansprechpartner. Zur Verstärkung unseres Teams suchen wir per sofort oder nach Vereinbarung eine motivierte Persönlichkeit, die sich beruflich weiterentwickeln möchte.",
          "identifier": {
            "@type": "PropertyValue",
            "name": "Garage Stucki AG",
            "value": "1"
          },
          "datePosted" : "2025-07-02",
          "validThrough" : "2025-12-31T00:00",
          "employmentType" : ["FULL_TIME", "PART_TIME"],
          "hiringOrganization" : {
            "@type" : "Organization",
            "name" : "Garage Stucki AG",
            "sameAs" : "https://www.stucki-roggwil.ch",
            "logo" : "https://www.stucki-roggwil.ch/static/assets/logo/logo-1-1.png"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "St. Urbanstrasse 35",
              "addressLocality": "Roggwil",
              "addressRegion": "Bern",
              "postalCode": "4914",
              "addressCountry": "CH"
            }
          }
        }`}
      </script>
      <PageHero title="Wir suchen! Du auch?" subline="Automobil-Mechatroniker/in oder Automobil-Fachmann/-frau 100%" />
      <GridContainer>
        <GridItem span="8">
          <Spacer size="07" />
          <Typography variant="buttontext">
            Klein aber fein: Die Garage Stucki AG ist ein langjährig etablierter Garagen&shy;betrieb im Ober&shy;aargau.
            Dank unserer regionalen Veran&shy;kerung und der Partner&shy;schaft mit KGM/&shy;SsangYong und
            Le&nbsp;GARAGE bieten wir ein breites Spektrum an Leistungen. Unser Angebot umfasst Verkauf, Reparaturen und
            Service&shy;arbeiten von Personen&shy;wagen, Liefer&shy;wagen und Wohn&shy;mobilen. Wir sind ein kompetenter
            und zuverlässiger Ansprech&shy;partner.
          </Typography>
          <Spacer size="04" />
          <Typography variant="buttontext">
            Zur Verstärkung unseres Teams suchen wir per sofort oder nach Vereinbarung eine motivierte Persönlichkeit,
            die sich beruflich weiter&shy;entwickeln möchte.
          </Typography>
          <Spacer size="06" />
          <Typography variant="buttontext">Deine Aufgaben</Typography>
          <Spacer size="03" />
          <ul>
            <li>
              <Typography>
                Du erstellst selbstständig Diagnosen und führst Service- und Reparaturarbeiten an PW, Lieferwagen und
                Wohnmobilen sorgfältig und effizient aus.
              </Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Die dir übertragenen Arbeiten erledigst du termingerecht und pflichtbewusst.</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>
                Du bist bereit, dich regelmässig auf unserem Aufgabengebiet weiterzubilden, damit wir unseren Kunden die
                bestmögliche Qualität bieten können.
              </Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>
                Bei Interesse besteht die Möglichkeit, sich in die Planung des operativen Tagesgeschäfts einzubringen
                oder in diese Aufgabe hineinzuwachsen
              </Typography>
            </li>
          </ul>
          <Spacer size="06" />
          <Typography variant="buttontext">Dein Profil</Typography>
          <Spacer size="03" />
          <ul>
            <li>
              <Typography>
                Du hast eine abgeschlossene Berufslehre als Automobil-Mechatroniker oder -Fachmann.
              </Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>
                Als Teamplayer überzeugst du uns mit deiner zuverlässigen, strukturierten und organisierten
                Arbeitsweise. Du arbeitest selbstständig, verantwortungsvoll und bist flexibel.
              </Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>
                Du magst Menschen und kommunizierst in einem guten Deutsch mit ihnen, mündlich wie auch schriftlich.
              </Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>
                Du bist motiviert und bereit, den nächsten beruflichen Schritt zu gehen. Wir bieten dir die
                entsprechenden Entwicklungsmöglichkeiten.
              </Typography>
            </li>
          </ul>
          <Spacer size="06" />
          <Typography tag="span" variant="buttontext">
            Unser Angebot
          </Typography>{' '}
          <Typography tag="span">neben den üblichen 5 bzw. 6 Wochen Ferien und 13. Monatslohn</Typography>
          <Spacer size="03" />
          <ul>
            <li>
              <Typography>
                Kleines, motiviertes Team – wir legen Wert auf gegenseitige Wertschätzung und Respekt
              </Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Persönliches, unkompliziertes Arbeitsumfeld – familiäre DU-Kultur</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Verantwortungsvolle und abwechslungsreiche Tätigkeit mit Perspektiven</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Möglichkeit für Kauf von zusätzlichen Ferientagen</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Gratis Wäscheservice für Überhosen</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Nutzung der Werkstatt zu Randzeiten für Arbeiten am eigenen Fahrzeug</Typography>
            </li>
            <Spacer size="02" />
            <li>
              <Typography>Ersatzteile zum Einkaufspreis sowie Rabatt bei Fahrzeugkauf</Typography>
            </li>
          </ul>
          <Spacer size="06" />
          <Typography>Bei Fragen sind wir gerne für dich da. Wir freuen uns auf deine Bewerbung an:</Typography>
          <Typography>
            Martin Stucki, <Link href="mailto:martin@stucki-roggwil.ch">martin@stucki-roggwil.ch</Link>
          </Typography>
          <Spacer size="08" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
