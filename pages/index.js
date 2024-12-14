import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("./Layout"), { ssr: false });

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
        <Image src="/NextJs.jpg" alt="Next Img" width={400} height={400} />
      </Layout>
    </>
  );
}
