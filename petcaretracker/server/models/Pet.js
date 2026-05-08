const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Pet',

  columns: {
    id: {
      primary: true,
      objectId: true,
    },

    name: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    age: {
      type: 'number',
    },

    Image: {
      type: 'string',
      nullable: true,
    },
  },
})
