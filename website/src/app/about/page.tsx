import type { Metadata } from 'next';
import { fetchSanityData } from '@/sanity/client';
import { PageHero } from '@/visual-components/page-hero/page-hero';
import { GridContainer, GridItem } from '@/visual-components/grid/grid';
import { Layout } from '@/modules/layout/layout';
import { Profile, ProfileContainer } from '@/visual-components/profile/profile';

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
  const employees = await fetchSanityData<
    {
      firstName: string;
      lastName: string;
      jobTitle: string;
      imageUrl: string;
    }[]
  >(EMPLOYEES_QUERY);

  return (
    <Layout activePath="/about">
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
            <Profile title="Wir suchen!" subtitle="Du auch?" href="/mech-job" image={null} />
          </ProfileContainer>
        </GridItem>
      </GridContainer>
    </Layout>
  );
}
