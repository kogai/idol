const MoronModel = require('moron').MoronModel;

/**
 * @extends MoronModel
 * @constructor
 */
function Idol() {
  MoronModel.apply(this, arguments);
}

MoronModel.extend(Idol);
module.exports = Idol;

// Table name is the only required property.
Idol.tableName = 'idol';

Idol.jsonSchema = {
  type: 'object',
  required: ['name'],

  properties: {
    idolid: { type: 'integer' },
    name: {type: 'string', minLength: 1, maxLength: 255},
		parameters: {
			stress: { type: 'integer' },
			vitality: { type: 'integer' },
			population: { type: 'integer' },
			charm: { type: 'integer' },
		}
  }
};

/*
// This object defines the relations to other models.
Idol.relationMappings = {
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
