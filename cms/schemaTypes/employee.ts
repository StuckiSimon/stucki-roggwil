import {defineField, defineType} from 'sanity'

export const employeeType = defineType({
  name: 'employee',
  title: 'Employee',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      type: 'string',
    }),
    defineField({
      name: 'jobTitle',
      type: 'string',
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
