import {defineField, defineType} from 'sanity'

export const openingHourExceptionType = defineType({
  name: 'openingHourException',
  title: 'Opening Hour Exception',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
    }),
  ],
})
