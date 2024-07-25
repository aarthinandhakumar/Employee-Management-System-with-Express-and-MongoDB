const { MongoClient, ServerApiVersion } = require("mongodb");
const credentials = require("./credentials.js");
const dbUrl = `mongodb+srv://${credentials.username}:${credentials.password}@${credentials.host}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(dbUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: true,
	useCreateIndex: true
  },
});

module.exports.connect = async () => {
  try {
    await client.connect();
  } catch {
    console.log("Tried opening the connection...");
  }
};

module.exports.disconnect = async () => {
  try {
    await client.close();
  } catch {
    console.log("Tried closing the connection.");
  }
};

module.exports.lookupByZipCode = async (zip) => {
  let collection = client.db(credentials.database).collection("zipcodes");
  let result = await collection.find({ _id: zip }).toArray();

  if (result.length > 0) return result[0];
  else return undefined;
};

module.exports.lookupByCityState = async (city, state) => {
  let collection = client.db(credentials.database).collection("zipcodes");
  let result = await collection.find({
    city: city.toUpperCase(),
    state: state.toUpperCase()
  }).sort({ _id: 1 })
  .toArray();

  return {
    city,
    state,
    data: result.map(entry => ({ zip: entry._id, pop: entry.pop }))
  };
};

module.exports.getPopulationByState = async (state) => {
  let collection = client.db(credentials.database).collection("zipcodes");
  let result = await collection.aggregate([
    { $match: { state: state.toUpperCase() } },
    { $group: { _id: "$state", totalPop: { $sum: "$pop" } } }
  ]).toArray();

  return {
    state,
    pop: result.length > 0 ? result[0].totalPop : 0
  };
};