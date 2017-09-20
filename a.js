const MongoClient = require ('mongodb').MongoClient
//viet gon lai: const {MongoClient} = require ('mongod')

const url = 'mongodb://localhost:27017/Users/NHA/Desktop/MongoData/shop';

MongoClient.connect(url)
.then(db => {
    const words = db.collection('word');
    return words.find().toArray()//dung return de lay ket qua array tra ve
})
.then(result => console.log(result))
.catch(err=> console.log(err.message));