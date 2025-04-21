import {defineField, defineType} from 'sanity'

export const assetType = defineType({
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'pdfFile',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
})
