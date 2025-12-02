import {defineField, defineType} from 'sanity'

export const homeTeaserType = defineType({
  name: 'homeTeaser',
  title: 'Home Teaser',
  type: 'document',
  fields: [
    defineField({
      name: 'ctaText',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
    }),
    defineField({
      name: 'asset',
      type: 'reference',
      to: [{type: 'asset'}],
    }),
    defineField({
      name: 'linkTarget',
      type: 'string',
      options: {
        list: [
          {title: 'Job', value: 'job'},
          {title: 'All-Inclusive Leasing', value: 'all-inclusive-leasing'},
        ],
      },
    }),
  ],
})
