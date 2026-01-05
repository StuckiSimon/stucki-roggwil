import type { Metadata } from 'next';
import { fetchSanityData } from '@/sanity/client';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Profile, ProfileContainer } from '@/visual-components/profile/profile';
import { usePathBuilder } from '@/core/router/use-path-builder';
import { Spacer } from '@/visual-components/spacer/spacer.tsx';
import { ButtonLink } from '@/visual-components/button/button.tsx';
import { CallToActionFragment } from '@/visual-components/call-to-action-fragment/call-to-action-fragment.tsx';

export const metadata: Metadata = {
  title: 'Über Uns | Garage Stucki AG',
  description: 'Erfahren Sie mehr über die Garage Stucki AG in Roggwil. Lernen Sie unser Team kennen.',
};

const EMPLOYEES_QUERY = `
  *[_type== "employee"]{
    firstName,
    lastName,
    jobTitle,
    "imageUrl": image.asset->url,
    order
  } | order(order asc)
  `;

export default async function About() {
  const { aboutPath, mechJobPath, bookingPath } = usePathBuilder();
  const employees = await fetchSanityData<
    {
      firstName: string;
      lastName: string;
      jobTitle: string;
      imageUrl: string;
    }[]
  >(EMPLOYEES_QUERY);

  return (
    <Layout activePath={aboutPath()}>
      <PageHero title="Über uns" subline="Seit 30 Jahren sind wir für Sie da." />
      <GridContainer>
        <GridItem>
          <ProfileContainer>
            {employees.result.map((employee) => (
              <Profile
                key={`${employee.firstName}-${employee.lastName}`}
                title={`${employee.firstName} ${employee.lastName}`}
                subtitle={employee.jobTitle}
                image={employee.imageUrl}
              />
            ))}
            <Profile title="Wir suchen!" subtitle="Du auch?" href={mechJobPath()} image={null} />
          </ProfileContainer>
        </GridItem>
        <GridItem>
          <Spacer size="09" />
          <CallToActionFragment
            title="Können wir Ihnen weiterhelfen?"
            text="Vereinbaren Sie noch heute einen Termin mit uns und erleben Sie unseren erstklassigen Service."
          >
            <ButtonLink href={bookingPath()}>Termin vereinbaren</ButtonLink>
          </CallToActionFragment>
          <Spacer size="09" />
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
