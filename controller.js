const { connectToDatabase, closeDatabaseConnection} = require('./db');
const fs = require('fs');

// Upload data to the database
async function uploadData(req, res) {
  const filePath = './data/plants-generation-data.json';

  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);

    const { dbCollection } = await connectToDatabase();

    await dbCollection.deleteMany({}); // Delete all existing data

    const result = await dbCollection.insertMany(jsonData); // Upload new data

    closeDatabaseConnection();

    return res.status(200).json({ message: 'Data uploaded successfully' });
  } catch (error) {
    console.error('Error uploading data to the database:', error);
    return res.status(500).json({ error: 'Failed to upload data to the database' });
  }
}

// Get all plants
async function getAllPlants(req, res) {
  try {
    const { dbCollection } = await connectToDatabase();

    const plants = await dbCollection.find({}).toArray();
    closeDatabaseConnection();

    return res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching plants from the database:', error);
    return res.status(500).json({ error: 'Failed to fetch plants from the database' });
  }
}

// Function to filter plants by state
async function getPlantsByState(req, res) {
  const state = req.params.state;

  try {
    const { dbCollection } = await connectToDatabase();

    const plants = await dbCollection.find({ 'Plant state abbreviation': state }).toArray();
    closeDatabaseConnection();

    return res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching plants from the database:', error);
    return res.status(500).json({ error: 'Failed to fetch plants from the database' });
  }
}


async function getTopPlants(req, res) {
  const limit = parseInt(req.query.limit);

  try {
    const { dbCollection } = await connectToDatabase();

    // $ne: '' 
    const plants = await dbCollection .find({
      'Generator annual net generation (MWh)': {
       $ne: '' 
        // $regex: /^\d+$|^"\d+"$/  // Match numbers or strings containing only numbers
      }
    }).sort({ 'Generator annual net generation (MWh)': -1 }) // Sort in descending order based on net generation
      .limit(limit) // Limit the result set to N
      .toArray();

    closeDatabaseConnection();

    return res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching top plants from the database:', error);
    return res.status(500).json({ error: 'Failed to fetch top plants from the database' });
  }
}

module.exports = {
  uploadData,
  getAllPlants,
  getPlantsByState,
  getTopPlants
};


/*      $and: [
        {
          $or: [
            { 'Generator annual net generation (MWh)': { $type: 1 } }, // Matches numeric values
            { 'Generator annual net generation (MWh)': { $regex: /^\d+$/ } } // Matches string values containing only numbers
          ]
        },
        { 'Generator annual net generation (MWh)': { $ne: '' } } // Exclude empty values
      ]*/