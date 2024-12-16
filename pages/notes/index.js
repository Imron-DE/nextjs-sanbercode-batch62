import dynamic from "next/dynamic";
import Link from "next/link";

const Layout = dynamic(() => import("../Layout"), { ssr: false });

export default function Notes({ notes }) {
  return (
    <Layout metaTitle="Notes" metaDescription="Ini adalah halaman notes">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Notes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.data.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`} className="block bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{note.title}</h2>
              <p className="text-gray-600 line-clamp-3">{note.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();

  return { props: { notes }, revalidate: 10 };
}
