import React from "react";
import type { NextPageWithLayout } from "./_app";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Box } from "@chakra-ui/react";
import TestRenders from "@/components/others/test";

const Page1: NextPageWithLayout = () => {
  return (
    <Box>
      <div>Page1</div>
      <TestRenders />
    </Box>
  );
};

Page1.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page1;
