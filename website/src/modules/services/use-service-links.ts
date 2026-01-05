import { usePathBuilder } from '@/core/router/use-path-builder.ts';

export function useServiceLinks() {
  const { stockPath, allInclusiveLeasingPath, tireServicePath, vehicleRentPath, reasonsForPath, contactPath } =
    usePathBuilder();

  function getLink(linkTarget: string): { href: string; text: string } {
    switch (linkTarget) {
      case 'contact':
        return {
          href: contactPath(),
          text: 'Kontakt',
        };
      case 'stock':
        return {
          href: stockPath(),
          text: 'Angebot',
        };
      case 'freizeitmobile':
        return {
          href: 'https://www.freizeitmobilestucki.ch',
          text: 'freizeitmobilestucki.ch',
        };
      case 'kgm-models':
        return {
          href: 'https://stucki-roggwil.kgm.ch/brochures-and-pricelists/',
          text: 'KGM Modelle',
        };
      case 'all-inclusive-leasing':
        return {
          href: allInclusiveLeasingPath(),
          text: 'All-Inclusive Leasing',
        };
      case 'tire-service':
        return {
          href: tireServicePath(),
          text: 'Reifenservice',
        };
      case 'rental':
        return {
          href: vehicleRentPath(),
          text: 'Autovermietung',
        };
      case 'why-stucki':
        return {
          href: reasonsForPath(),
          text: 'Wieso Stucki AG?',
        };
      default:
        return {
          href: contactPath(),
          text: 'Kontakt',
        };
    }
  }

  return { getLink };
}
