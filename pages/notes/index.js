import dynamic from "next/dynamic";
import { Box, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = dynamic(() => import("../Layout"), { ssr: false });

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState([]);

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
  console.log(notes);

  return (
    <Layout metaTitle="Notes" metaDescription="Ini adalah halaman notes">
      <Box padding="5">
        <Flex justifyContent="end">
          <Button colorScheme="blue" onClick={() => router.push("/notes/add")}>
            Add Notes
          </Button>
        </Flex>
        <Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {notes?.data?.map((item) => (
              <GridItem key={item.id}>
                <Card>
                  <CardHeader>
                    <Heading>{item.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{item.description}</Text>
                  </CardBody>
                  <CardFooter>
                    <Button flex="1" variant="ghost" colorScheme="gray" bg="Gray.500" color="white">
                      Edit
                    </Button>
                    <Button flex="1" variant="solid" colorScheme="red" bg="red.500" color="white">
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://service.pace-unv.cloud/api/notes");
//   const notes = await res.json();

//   return { props: { notes }, revalidate: 10 };
// }
