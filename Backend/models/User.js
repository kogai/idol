const MoronModel = require('moron').MoronModel;

/**
 * @extends MoronModel
 * @constructor
 */
function User() {
  MoronModel.apply(this, arguments);
}

MoronModel.extend(User);
module.exports = User;

// Table name is the only required property.
User.tableName = 'user';

User.jsonSchema = {
  type: 'object',
  required: ['userid', 'name', 'mail', 'password'],

  properties: {
    userid: { type: 'string' },
    isVerified: { type: 'tinyint', minLength: 1 },
    name: {type: 'string', minLength: 1, maxLength: 255},
    mail: {type: 'string', minLength: 1, maxLength: 255},
    password: {type: 'string', minLength: 1, maxLength: 255},
  }
};

/*
// This object defines the relations to other models.
User.relationMappings = {
  owner: {
    relation: MoronModel.OneToOneRelation,
    // The related model. This can be either a MoronModel subclass constructor or an
    // absolute file path to a module that exports one. We use the file path version
    // here to prevent require loops.
    modelClass: __dirname + '/Person',
    join: {
      from: 'Animal.ownerId',
      to: 'Person.id'
    }
  }
};
*/
