import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  type TableCellProps,
  type TableContainerProps,
  type TableProps,
} from "@chakra-ui/react";

interface TableComponentTypes {
  data?: object[];
  columnHeaders?: string[];
  enableNumberColumn?: boolean;
  headersTextTransform?: "capitalize" | "lowercase" | "uppercase" | "unset";
  thead?: React.JSX.Element;
  tdBodyStyle?: TableCellProps;
  enableScroll?: boolean;
  tableContainerStyle?: TableContainerProps;
  tableStyle?: TableProps;
}

export const TableComponent = ({
  columnHeaders = [],
  data = [{ "No Header Yet ...": "No data yet ..." }],
  enableNumberColumn = false,
  headersTextTransform = "unset",
  thead,
  tdBodyStyle,
  enableScroll,
  tableContainerStyle,
  tableStyle,
}: TableComponentTypes) => {
  const tableHeaders =
    columnHeaders.length > 0
      ? columnHeaders
      : data.length > 0
        ? Object.keys(data[0])
        : ["No Data available to parse ..."];

  return (
    <TableContainer
      py={0}
      minH={"xs"}
      maxW={"full"}
      position={"relative"}
      {...tableContainerStyle}
    >
      <Table
        py={0}
        variant="simple"
        position={"relative"}
        // maxH={"2xl"}
        // overflowY={"auto"}
        {...tableStyle}
      >
        {thead ?? (
          <Thead
            position={"sticky"}
            top={0}
            h={"50px"}
            bgColor={"#FCFCFC"}
            zIndex={1}
          >
            <Tr>
              {enableNumberColumn && (
                <Th w={"68px"} textTransform={headersTextTransform}>
                  No
                </Th>
              )}
              {tableHeaders.map((header, index) => (
                <Th key={index} textTransform={headersTextTransform}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
        )}
        <Tbody fontSize={{ base: "12px", md: "14px" }}>
          {data.length > 0 ? (
            data.map((row, index) => (
              <Tr key={index} _hover={{ bgColor: "whitesmoke" }}>
                {enableNumberColumn && <Td>{index + 1}</Td>}
                {Object.values(row).map((data: any, index) => (
                  <Td key={index} {...tdBodyStyle}>
                    {data}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td>No Data Yet</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
