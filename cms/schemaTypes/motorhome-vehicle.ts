import {defineField, defineType} from 'sanity'

export const motorhomeVehicleType = defineType({
  name: 'motorhomeVehicle',
  title: 'Motorhome Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'initialRegistrationMonth',
      title: 'Initial registration month',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1).max(12),
    }),
    defineField({
      name: 'initialRegistrationYear',
      title: 'Initial registration year',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1900),
    }),
    defineField({
      name: 'mileageKm',
      title: 'Mileage (km)',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'priceChf',
      title: 'Price (CHF)',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'seatCount',
      title: 'Seat count',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'sleepingPlaceCount',
      title: 'Sleeping place count',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Order',
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
