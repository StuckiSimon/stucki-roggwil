import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
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
      name: 'linkTarget',
      type: 'string',
      options: {
        list: [
          {title: 'Kontakt', value: 'contact'},
          {title: 'Angebot', value: 'stock'},
          {title: 'freizeitmobilestucki.ch', value: 'freizeitmobile'},
          {title: 'KGM Modelle', value: 'kgm-models'},
          {title: 'All-Inclusive Leasing', value: 'all-inclusive-leasing'},
          {title: 'Reifenservice', value: 'tire-service'},
          {title: 'Autovermietung', value: 'rental'},
          {title: 'Wieso Stucki AG?', value: 'why-stucki'},
        ],
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
