const { MongoClient } = mongodb;

const uri = "mongodb+srv://frc:Eya2AHP6bpoEWDvJ@cluster0.hek4tgf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function addData(dbName, collectionName, data) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    console.log(`Inserted ${result.insertedCount} document(s) into the collection.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

async function getData(dbName, collectionName) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const cursor = collection.find();
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    } else {
      await cursor.forEach((doc) => {
        console.log(doc);
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
