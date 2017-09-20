const MongoClient = require ('mongodb').MongoClient
//viet gon lai: const {MongoClient} = require ('mongod')

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));

let WordsCollection;
app.get('/',(req,res)=> {
    WordsCollection.find().toArray() //tra ve la 1 cai promise
    .then(result => res.render('home',{arrWords: result}))
    .catch(err => res.send(err.message));
});

const url = 'mongodb://localhost:27017/shop';

MongoClient.connect(url)
.then(db => {
    app.listen(3000, ()=> console.log('server started'));
    WordsCollection = db.collection('words');//lay ra collection    
})

.catch(err=> console.log(err.message));

//https://www.youtube.com/watch?v=wQkXLWME88s&feature=youtu.be