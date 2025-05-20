import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Layout from '../components/Layout';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      author
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-extrabold text-gray-700 text-center mb-4">
          Discover the Latest Insights
        </h1>
        <p className="text-lg text-gray-500 text-center mb-10 max-w-2xl mx-auto">
          Stay informed with expert articles and updates curated for curious minds.
        </p>

        {loading && (
          <div className="flex justify-center py-20">
            <span className="text-lg text-gray-600">Loading posts...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-6 text-center">
            Error loading posts: {error.message}
          </div>
        )}

        {!loading && !error && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10">
            {data.posts.map(({ id, title, author }) => (
              <li
                key={id}
                className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-gray-100"
              >
                <Link href={`/post/${id}`} legacyBehavior>
                  <a className="block text-3xl font-semibold text-blue-700 hover:text-blue-900 hover:underline">
                    {title}
                  </a>
                </Link>
                <p className="mt-4 text-gray-600 text-base font-medium">By {author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
