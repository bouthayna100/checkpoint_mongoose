
let mongoose = require( 'mongoose' )
//Schema and Model
//Create a person Model 
const PersonSchema = new mongoose.Schema( {
      name: { type: String, required: true, default: 'Sara Brahem' },
      age: { type: Number, default: 25 },
      favoriteFoods: { type: [ String ], default: [ 'Pizza', 'Spagitti' ] },
} );

module.exports = mongoose.model( 'Person', PersonSchema )
