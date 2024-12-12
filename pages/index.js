import { useEffect } from "react";
import Layout from "./Layout";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("respon=>", res))
      .catch((err) => console.log("error=>", err));
  }, []);

  return (
    <>
      <Layout metaTitle="Home" metaDescription="ini adalah halaman home">
        <p>Home</p>
      </Layout>
    </>
  );
}
