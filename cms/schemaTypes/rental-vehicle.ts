import {defineField, defineType} from 'sanity'

export const rentalVehicleType = defineType({
  name: 'rentalVehicle',
  title: 'Rental Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'dailyRate',
      type: 'number',
    }),
    defineField({
      name: 'additionalKmRate',
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
