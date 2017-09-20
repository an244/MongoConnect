const MongoClient = require ('mongodb').MongoClient
//viet gon lai: const {MongoClient} = require ('mongod')

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));

app.get('/',(req,res)=> res.render('home'));

const url = 'mongodb://localhost:27017/shop';

MongoClient.connect(url)
.then(db => {
    app.listen(3000, ()=> console.log('server started'));
    const words = db.collection('words');
    return words.find().toArray()//dung return de lay ket qua array tra ve
})
.then(result => console.log(result))
.catch(err=> console.log(err.message));

