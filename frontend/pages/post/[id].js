import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author
    }
  }
`;

import Layout from '../../components/Layout';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error.message}</p>;
  if (!data?.post) return <p className="p-4">Post not found.</p>;

  const { title, content, author } = data.post;

  return (
    <Layout>
      <Link href="/" legacyBehavior>
        <a className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to posts</a>
      </Link>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-6">{content}</p>
      <p className="text-gray-600 font-semibold">By {author}</p>
    </Layout>
  );
}
