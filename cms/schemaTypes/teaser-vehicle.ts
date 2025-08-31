import {defineField, defineType} from 'sanity'

export const teaserVehicleType = defineType({
  name: 'teaserVehicle',
  title: 'Teaser Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'detailsUrl',
      type: 'url',
    }),
  ],
})
