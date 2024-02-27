import { Box, Button } from "@chakra-ui/react";
import React from "react";

export default function TestRenders() {
  return (
    <Box display={"flex"} maxW={"200px"} flexDir={"column"}>
      <Button my={1}>Button 1</Button>
      <Button my={1} variant={"variant-001"}>
        Button 2
      </Button>
    </Box>
  );
}
