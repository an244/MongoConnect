const MongoClient = require ('mongodb').MongoClient
//viet gon lai: const {MongoClient} = require ('mongod')

const express = require('express');
const app = express();
const parser = require('body-parser').urlencoded({extended:false});

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));

let WordsCollection;
app.get('/',(req,res)=> {
    WordsCollection.find().toArray() //Object WordsCollection de tra ve method find() tra ve la 1 cai promise
    .then(result => res.render('home',{arrWords: result}))
    .catch(err => res.send(err.message));
});

app.post('/add', parser, (req,res)=> {
     const {en, vn} = req.body;//lay tham so en, vn da duoc dat ten ben home.ejs
     WordsCollection.insert({en, vn})
     .then(()=> res.redirect('/'))
     .catch(er => res.send(er.message));
});

const url = 'mongodb://localhost:27017/shop';

MongoClient.connect(url)
.then(db => {
    app.listen(3000, ()=> console.log('server started'));
    WordsCollection = db.collection('words');//lay ra collection    
})

.catch(err=> console.log(err.message));

//https://www.youtube.com/watch?v=wQkXLWME88s&feature=youtu.be