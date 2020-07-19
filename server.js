const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ap354455',
    database : 'smart-brain'
  }
});
const app = express();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	db.select('*').from('users')
	.then(database => res.json(database))
	.catch(err => res.status(400).json('Cannot Access to Database'))
})
app.post('/signin', signin.handleSignin(db, bcrypt)) // IIFF
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})

/*
/ --> res = This is working
/signin --> POST = success/fail
/register --> POST = users
/profile/:usersId --> GET = users
/image --> PUT --> users

*/



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
