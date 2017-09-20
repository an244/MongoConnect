const MongoClient = require ('mongodb').MongoClient
//viet gon lai: const {MongoClient} = require ('mongod')

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));

let arrWords = [];
app.get('/',(req,res)=> res.render('home', {arrWords}));


const url = 'mongodb://localhost:27017/shop';

MongoClient.connect(url)
.then(db => {
    app.listen(3000, ()=> console.log('server started'));
    const words = db.collection('words');//lay ra collection
    return words.find().toArray();
})
.then(result => arrWords = result)
.catch(err=> console.log(err.message));

