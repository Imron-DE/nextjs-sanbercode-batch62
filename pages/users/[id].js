import Head from "next/head";
import Layout from "../Layout";
import { useRouter } from "next/router";

export default function UserByName() {
  const router = useRouter();
  const { id } = router?.query;

  return (
    <>
      <Layout>
        <Head>
          <title>{`User By Name: ${id || "Loading..."}`}</title>
        </Head>
        <p>User By Name: {id}</p>
      </Layout>
    </>
  );
}
