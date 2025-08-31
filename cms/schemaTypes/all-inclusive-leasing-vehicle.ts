import {defineField, defineType} from 'sanity'

export const allInclusiveLeasingVehicleType = defineType({
  name: 'allInclusiveLeasingVehicle',
  title: 'All-Inclusive Leasing Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'monthlyLeasingRate',
      type: 'number',
    }),
    defineField({
      name: 'totalKm',
      type: 'number',
    }),
    defineField({
      name: 'leasingDurationMonths',
      type: 'number',
    }),
    defineField({
      name: 'vehicle',
      type: 'reference',
      to: [{type: 'teaserVehicle'}],
    }),
    defineField({
      name: 'order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
