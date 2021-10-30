const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ridwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db('aladinDelivery');
    const deliveryCollection = database.collection('delivery');

    // GET API

    app.get('/delivery', async (req, res) => {
      const cursor = deliveryCollection.find({});
      const delivery = await cursor.toArray();
      res.send(delivery);
    });

    // GET Single Service
    app.get('/delivery/:id', async (req, res) => {
      const id = req.params.id;
      console.log('getting specific delivery', id);
      const query = { _id: ObjectId(id) };
      const delivery = await deliveryCollection.findOne(query);
      res.json(delivery);
    });

    // POST API

    app.post('/delivery', async (req, res) => {
      const delivery = req.body;
      console.log('hit the post api', delivery);
      const result = await deliveryCollection.insertOne(delivery);
      console.log(result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('running assignment-11 server');
});

app.listen(port, () => {
  console.log('running assignment-11 on port', port);
});
