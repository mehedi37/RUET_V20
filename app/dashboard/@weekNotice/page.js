'use client'
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

export default function WeekNotice() {

  function formatDate(dateString) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    async load({signal}) {
      try {
        let res = await fetch(`http://localhost:3000/api/weekUpdate`, {
          signal,
        });
        let json = await res.json();
        // console.log("Table: ", json.data);
        setIsLoading(false);

        return {
          items: json.data || [], // Ensure items is always an array
        };
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
        return {
          items: [],
        };
      }
    },
  });

  return (
    <div className="min-h">
      <h1 className="text-center p-4">Weekly CT Update</h1>
      <Table
        aria-label="Weekly CT Update"
        classNames={{
          table: "min-h",
        }}
        layout="auto"
      >
        <TableHeader className="">
          <TableColumn key="time">
            Time
          </TableColumn>
          <TableColumn key="course_code">
            Course Code
          </TableColumn>
          <TableColumn key="note">
            Note
          </TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent="No data available"
        >
          {(item) => (
            <TableRow key={item.ct_id}>
              <TableCell>{formatDate(item.time)}</TableCell>
              <TableCell>{item.course_code}</TableCell>
              <TableCell>{item.note}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
