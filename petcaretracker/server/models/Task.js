const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Task',

  columns: {
    id: {
      primary: true,
      objectId: true,
    },

    title: {
      type: 'string',
    },

    category: {
      type: 'string',
    },

    completed: {
      type: 'boolean',
      default: false,
    },

    date: {
      type: 'date',
    },

    petId: {
      type: 'string',
    },
  },
})
