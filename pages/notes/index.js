import dynamic from "next/dynamic";
import { Box, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueries } from "@/hooks/useQueries";

const Layout = dynamic(() => import("../Layout"), { ssr: false });

export default function Notes() {
  const { data, isLoading } = useQueries({ prefixUrl: "https://service.pace-unv.cloud/api/notes" });
  console.log("data =>", data);
  const router = useRouter();
  const [notes, setNotes] = useState([]);

  // Function to handle deleting a note
  const HandleDelete = async (id) => {
    try {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/delete/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result?.success) {
        router.reload();
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Fetching notes data
  useEffect(() => {
    async function fetchingData() {
      try {
        const res = await fetch("https://service.pace-unv.cloud/api/notes");
        const listnotes = await res.json();
        setNotes(listnotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }
    fetchingData();
  }, []);

  return (
    <Layout metaTitle="Notes" metaDescription="Ini adalah halaman notes">
      <Box padding="5">
        <Flex justifyContent="end" marginBottom="4">
          <Button colorScheme="blue" onClick={() => router.push("/notes/add")}>
            Add Notes
          </Button>
        </Flex>
        {isLoading ? (
          <Flex alignItems="center" justifyContent="center" height="200px">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Flex>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {data?.data?.map((item) => (
              <GridItem key={item.id}>
                <Card>
                  <CardHeader>
                    <Heading>{item.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{item.description}</Text>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={() => router.push(`/notes/edit/${item.id}`)} flex="1" variant="ghost" color="black">
                      Edit
                    </Button>
                    <Button onClick={() => HandleDelete(item.id)} flex="1" variant="solid" colorScheme="red" bg="red.500" color="white">
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
