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
  ],
})
