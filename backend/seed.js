const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://itekkeml0f:p1XZZ6FTzFo2rRhc@cluster0.r0rhn2a.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'blogdb';
const COLLECTION_NAME = 'posts';

const demoPosts = [
  {
    title: "First Blog Post",
    content: "This is the content of the first blog post. Welcome to the blog!",
    author: "John Doe"
  },
  {
    title: "Second Blog Post",
    content: "This is the content of the second blog post. More content here.",
    author: "Jane Smith"
  }
];

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertMany(demoPosts);
    console.log(`Inserted ${result.insertedCount} posts.`);
  } catch (err) {
    console.error('Error inserting demo posts:', err);
  } finally {
    await client.close();
  }
}

seed();
