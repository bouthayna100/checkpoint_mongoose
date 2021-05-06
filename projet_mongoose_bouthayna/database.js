//Installing and setting up Mongoose:
let mongoose = require( 'mongoose' );
//Store your MongoDB Atlas database URI in the private.env file as MONGO_URI.
require( 'dotenv' ).config();
let PersonModel = require( './src/models/Person' )

mongoose.set( 'useFindAndModify', false );
mongoose.set( 'useCreateIndex', true );




// mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });

const Database = () => {

  mongoose.connect( process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => {
      console.log( 'Database connection successful' )
    } )
    .catch( err => {
      console.error( `Error connecting to the database.` );
    } )
}

//find all and remove all : optionnel method 
const searchAll = () => {
  PersonModel.find().then( ( data ) => {
    console.log( "data all" + data );
  } )
    .catch( ( err ) => {
      console.log( err );
    } );
}

const removeAll = (done) => {
  PersonModel.remove( ( err, data ) => {
    if ( err ) throw err;
    console.log( 'Data delated: ' + data );
    done(err,data)
  } )
}

exports.Database = Database;
//export of three methode to be used on routes/ person.js optionnel work
exports.removeAll = removeAll;
exports.searchAll = searchAll