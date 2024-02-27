import { Box, Flex, HStack } from "@chakra-ui/react";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <HStack bgColor={"whitesmoke"}>
      <Flex maxW={"200px"} bgColor={"lightcyan"}></Flex>
      <Box>
        <Flex mb={2} bgColor={"lightblue"}>
          TopBar
        </Flex>
        <Box>{children}</Box>
      </Box>
    </HStack>
  );
}
