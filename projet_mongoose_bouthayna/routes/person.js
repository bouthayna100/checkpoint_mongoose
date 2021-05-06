const express = require( 'express' );
const router = express.Router();

//Installing and setting up Mongoose:
let PersonModel = require( '../src/models/Person' )
let mongoose = require( 'mongoose' );
require( 'dotenv' ).config();
mongoose.set( 'useFindAndModify', false );
mongoose.set( 'useCreateIndex', true );

const removeAll = require( '../database' ).removeAll;
const searchAll = require( '../database' ).searchAll;

//Create and save a person with a prototype:
//the initial state of  dababase is empty

router.get( '/create-person', ( req, res ) => {
    let person = new PersonModel( {
        name: 'Sana Arbi',
        age: 24,
        favoriteFoods: [ 'Pizza', 'Spaghetti' ],
        email: 'sana.arbi@gmail.com'
    } )
    person.save( function ( err, data ) {
        if ( err ) res.status( 400 ).json( err );
        res.status( 200 ).json( { msg: "Success request: create-person", data } )
    } );
} )

//Create and Save a Record of a Model:

router.get( '/create-many-person', ( req, res ) => {
    let arrayOfPeople = [ {
        name: 'Iyed Harbaoui',
        age: 20,
        favoriteFoods: [ 'Hot dog', 'Cheese' ],
    },
    {
        name: 'Ines Mabrouk',
        age: 23,
        favoriteFoods: [ 'Fish', 'Ice cream' ],
    },
    {
        name: 'Sara Abed',
        age: 30,
        favoriteFoods: [ 'Sandwich', 'Ham' ],
    } ];
    PersonModel.create( arrayOfPeople, function ( err, data ) {
        if ( err ) res.status( 400 ).json( err );
        res.status( 200 ).json( { msg: "Success request: create-many-person", data } );
    } )
} )

//Use model.findOne() to Return a Single Matching Document from Your Database
router.get( '/search-by-food/:food', ( req, res ) => {
    const food = req.params.food
    PersonModel.findOne( { favoriteFoods: food }, function ( err, data ) {
        if ( err ) res.status( 400 ).json( err );
        res.status( 200 ).json( { msg: "Success request: search-by-food", data } );
    } );
} )

//Use model.findById() to Search Your Database By _id
router.get( '/search-by-id/:id', ( req, res ) => {
    const personId = req.params.id
    PersonModel.findById( { _id: personId }, function ( err, data ) {
        if ( err ) res.status( 400 ).json( err );
        res.status( 200 ).json( { msg: "Success request: search-by-id", data } );
    } )
} )

//Use model.find() to Search Your Database

router.get( '/search-by-name/:name', ( req, res ) => {
    const personName = req.params.name
    PersonModel.find( { name: personName }, function ( err, data ) {
        if ( err ) res.status( 400 ).json( err );
        res.status( 200 ).json( { msg: "Success request: succes search-by-name", data } );
    }
    )

} )

//Perform Classic Updates by Running Find, Edit, then Save
router.put( '/search-and-modify-by-id/:id', ( req, res ) => {
    const personId =
        req.params.id
    PersonModel.findById( { _id: personId } )
        .then( ( data ) => {
            data.favoriteFoods.push( 'Hamburger' );
            data.markModified( 'favoriteFoods' );
            data.save();
            console.log( "data modified by id success" + data );
            res.status( 200 ).json( { msg: "Success request: search-and-modify-by-id", data } );
        } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } )
} )

//Perform New Updates on a Document Using model.findOneAndUpdate()
//just enter the name into the url
router.put( '/find-one-and-update/:name', ( req, res ) => {
    const personName = req.params.name
    PersonModel.findOneAndUpdate( { name: personName }, { age: 20 }, {
        new: true
    } ).then( ( data ) => {
        console.log( "find - one - and - update" + data );
        res.status( 200 ).json( { msg: "Success request: find - one - and - update", data } );
    } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )

//Delete One Document Using model.findByIdAndRemove
router.delete( '/find-by-id-and-remove/:id', ( req, res ) => {
    const personId = req.params.id
    PersonModel.findByIdAndRemove( { _id: personId } )
        .then( ( data ) => {
            console.log( "find-by-id-and-remove" + data );
            res.status( 200 ).json( { msg: "Success request: find-by-id-and-remove", data } );
        } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )

//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete( '/remove-name-marry', ( req, res ) => {
    PersonModel.remove( { name: 'Marry' } )
        .then( ( data ) => {
            console.log( "remove - name -marry" + data );
            res.status( 200 ).json( { msg: "Success request: person-with-name-marry deleted by id with success", data } );
        } )

        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )

//Chain Search Query Helpers to Narrow Search Results
router.get( '/search-by-burritos', ( req, res ) => {
    PersonModel.find( { favoriteFoods: 'Burritos' } )
        .sort( { name: 1 } ).limit( 2 ).select( { name: true, favoriteFoods: true } )
        .exec()
        .then( data => {
            res.status( 200 ).json( { msg: "Success request: search-by-burritos", data } );

            console.log( 'search-by-burritos' + data )
        } )
        .catch( err => {
            res.status( 400 ).json( err );
        } );
} )



//Crud Person optionnel work
router.post( '/new-person', ( req, res ) => {
    const { name, age, favoriteFoods } = req.body;
    const persone = new PersonModel( {
        name: name,
        age: age,
        favoriteFoods: favoriteFoods
    } )
    persone.save()
        .then( ( data ) => {
            res.status( 200 ).json( "Success request: new-person" + data );
        } )
        .catch( ( err ) => {
            res.status( 400 ).json( err );
        } );
} )

//delete all person if you want to remove all the persons =>
router.delete( '/remove-all', ( req, res ) => {
    removeAll( ( err, data ) => {
        res.status( 200 ).json( "Success request: remove-all" + data );
        if ( err ) res.status( 400 ).json( err );
    } );
} )



//all person on console from data base
searchAll();

module.exports = router