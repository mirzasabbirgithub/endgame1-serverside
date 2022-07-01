const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://endgame:c4iWWTYS50wVmlJI@cluster0.bdegy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
          try {
                    await client.connect();
                    console.log('database connected');
                    const taskCollection = client.db('allTasks').collection('task');

                    // get task from mongodb
                    app.get('/task', async (req, res) => {
                              const query = {};
                              const cursor = taskCollection.find(query);
                              const tasks = await cursor.toArray();
                              res.send(tasks);
                    });

                    //Individual Task fetch
                    app.get('/task/:id', async (req, res) => {
                              const id = req.params.id;
                              const query = { _id: ObjectId(id) };
                              const tasks = await taskCollection.findOne(query);
                              res.send(tasks);
                    });


                    //post task
                    app.post('/task', async (req, res) => {
                              const newTask = req.body;
                              const result = await taskCollection.insertOne(newTask);
                              res.send(result);
                    });

          }
          finally {
          }

}

run().catch(console.dir);


app.get('/', (req, res) => {
          res.send('Server is runnning');
});

app.listen(port, () => {
          console.log('Listening to port', port);
})