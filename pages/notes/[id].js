import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../Layout"), { ssr: false });

export default function DetailNotes({ notes }) {
  return (
    <Layout metaTitle="Detail Notes" metaDescription="Ini adalah halaman Detail Notes">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Title: {notes.data.title}</h1>
          <p className="text-lg text-gray-600 mb-6">Desc: {notes.data.description}</p>
          <div className="text-sm text-gray-500 border-t pt-4">
            <p>
              <span className="font-medium text-gray-700">Created At:</span>{" "}
              {new Date(notes.data.created_at).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <span className="font-medium text-gray-700">Updated At:</span>{" "}
              {new Date(notes.data.updated_at).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();

  const paths = notes.data.map((item) => ({
    params: {
      id: item.id,
    },
  }));
  return {
    paths,
    fallback: false, // false or "blocking"
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
  const notes = await res.json();

  return { props: { notes }, revalidate: 10 };
}
