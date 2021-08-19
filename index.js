const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(bodyParser.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.grbvc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("PhotographyService").collection("services");

  app.post('/addServices', (req, res) => {
    const service = req.body;
    serviceCollection.insertOne(service)
      .then(result => {
        console.log(result);
        res.send(result.insertedCount)
      })
  })
});

app.get('/', (req, res) => {
  res.send('Hello Photographer!')
})

app.listen(process.env.PORT || port);

// collection: services