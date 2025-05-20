const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://itekkeml0f:p1XZZ6FTzFo2rRhc@cluster0.r0rhn2a.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'blogdb';
const COLLECTION_NAME = 'posts';

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`;

async function startServer() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db(DB_NAME);
  const postsCollection = db.collection(COLLECTION_NAME);

  const resolvers = {
    Query: {
      posts: async () => {
        const posts = await postsCollection.find().toArray();
        return posts.map(({ _id, title, content, author }) => ({
          id: _id.toString(),
          title,
          content,
          author,
        }));
      },
      post: async (_, { id }) => {
        if (!ObjectId.isValid(id)) return null;
        const post = await postsCollection.findOne({ _id: new ObjectId(id) });
        if (!post) return null;
        return {
          id: post._id.toString(),
          title: post.title,
          content: post.content,
          author: post.author,
        };
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
