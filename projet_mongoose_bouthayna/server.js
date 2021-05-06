const express = require( 'express' );
const db = require( './database' ).Database;

const app = express();
app.use( express.json() );
//connect to database with function db
db();

app.use('/api', require('./routes/person'))
app.listen(5000, (err) => {
  if (err) console.log(err);
  else console.log('server is running on port 5000');
});
