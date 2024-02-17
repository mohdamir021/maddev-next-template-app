import { TableComponent } from "@/components/ui/table/table";
import { Image } from "@chakra-ui/react";
import Head from "next/head";
import SampleData from "@/store/json/data-with-image.json";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1>ExcelJS Library Experimental Start Here</h1>
        </div>
        <TableComponent
          data={SampleData.map((data) => ({
            Name: data?.Name,
            Age: data?.Age,
            Waifu: <Image w={"400px"} alt="preview" src={data?.Waifu} />,
          }))}
        />
      </main>
    </>
  );
}
