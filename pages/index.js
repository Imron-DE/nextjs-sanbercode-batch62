import Image from "next/image";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("./Layout"), { ssr: false });

export default function Home() {
  return (
    <>
      <Layout metaTitle="Home" metaDescription="ini adalah halaman home">
        <p>Home</p>
        <Image src="/NextJs.jpg" alt="Next Img" width={400} height={400} />
      </Layout>
    </>
  );
}
