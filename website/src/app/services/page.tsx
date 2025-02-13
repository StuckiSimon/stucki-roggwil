import { fetchSanityData } from "@/sanity/client";

const SERVICES_QUERY = `
  *[_type== "service"]{
    title,
    description,
    linkTarget,
    "imageUrl": image.asset->url
  }
  `;

export default async function Home() {
  const services = await fetchSanityData<
    {
      title: string;
      description: string;
      linkTarget: string;
      imageUrl: string;
    }[]
  >(SERVICES_QUERY);

  return (
    <div>
      {services.result.map((service) => (
        <h1 key={service.title}>
          {service.title}
          <img
            style={{ width: 200 }}
            src={`${service.imageUrl}?w=600`}
            alt={service.title}
          />
        </h1>
      ))}
    </div>
  );
}
