import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../Layout"), { ssr: false });

export default function posts({ posts }) {
  return (
    <Layout metaTitle="Posts" metaDescription="Ini adalah halaman posts">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Posts</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Body</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{post.id}</td>
                <td className="px-4 py-2 border-b">{post.title}</td>
                <td className="px-4 py-2 border-b">{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  // Pass data to the page via props
  return { props: { posts } };
}
