import dynamic from "next/dynamic";
import { Box, Flex, Grid, Card, GridItem, Heading, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = dynamic(() => import("../Layout"), { ssr: false });

export default function AddNotes() {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://service.pace-unv.cloud/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      });
      const result = await res.json();

      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  return (
    <Layout metaTitle="Notes" metaDescription="Ini adalah halaman notes">
      <Card margin="5" padding="5">
        <Heading>Add Notes</Heading>
        <Grid gap="5  ">
          <GridItem>
            <Text>Title</Text>
            <Input type="text" onChange={(e) => setNotes({ ...notes, title: e.target.value })} />
          </GridItem>
          <GridItem>
            <Text>Description</Text>
            <Textarea onChange={(e) => setNotes({ ...notes, description: e.target.value })} />
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
