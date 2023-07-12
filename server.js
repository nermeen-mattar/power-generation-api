const express = require('express');
const app = express();
const routes = require('./routes');
const { connectToDatabase, closeDatabaseConnection } = require('./db');
const swaggerSetup = require('./swagger');
const cors = require('cors');

const uri = "mongodb+srv://nermeenwmattar:PePaTUtX4A5G7SR3@cluster0.z2odspp.mongodb.net/?retryWrites=true&w=majority";

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function run() {
  const { dbClient } = await connectToDatabase(uri);

  try {
    await dbClient.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    closeDatabaseConnection();
  }
}

run().catch(console.dir);

// Setup Swagger
swaggerSetup(app);
