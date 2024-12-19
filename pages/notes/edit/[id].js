import dynamic from "next/dynamic";
import { Box, Flex, Grid, Card, GridItem, Heading, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = dynamic(() => import("../../Layout"), { ssr: false });

export default function EditNotes() {
  const router = useRouter();
  const { id } = router?.query;
  const [notes, setNotes] = useState();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: notes?.title, description: notes?.description }),
      });
      const result = await res.json();

      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    async function fetchingData() {
      try {
        const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
        const listnotes = await res.json();
        setNotes(listnotes?.data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }
    fetchingData();
  }, [id]);

  return (
    <Layout metaTitle="Notes" metaDescription="Ini adalah halaman notes">
      <Card margin="5" padding="5">
        <Heading>Edit Notes</Heading>
        <Grid gap="5  ">
          <GridItem>
            <Text>Title</Text>
            <Input type="text" value={notes?.title} onChange={(e) => setNotes({ ...notes, title: e.target.value })} />
          </GridItem>
          <GridItem>
            <Text>Description</Text>
            <Textarea value={notes?.description} onChange={(e) => setNotes({ ...notes, description: e.target.value })} />
          </GridItem>
          <GridItem>
            <Button onClick={HandleSubmit} colorScheme="blue">
              Submit
            </Button>
          </GridItem>
        </Grid>
      </Card>
    </Layout>
  );
}
