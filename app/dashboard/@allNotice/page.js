"use client";
import { useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function AllNotice() {
  function formatDate(dateString) {
    const options = { weekday: "short", day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/allNoticeUpdate`,
          {
            signal,
          }
        );
        let json = await res.json();

        // Check if the response indicates no data
        if (json.data === process.env.NO_CT_FOUND) {
          setNoDataMessage(json.data);
          setIsLoading(false);
          return {
            items: [],
          };
        }

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
      <h1 className="text-center p-4">Weekly Notice</h1>
      <Table
        aria-label="Weekly Notice"
        classNames={{
          table: "min-h",
        }}
      >
        <TableHeader className="">
          <TableColumn key="time" className="text-center">
            Time
          </TableColumn>
          <TableColumn key="note" className="text-center">
            Note
          </TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={process.env.NEXT_PUBLIC_NO_CT_ERROR}
        >
          {(item) => (
            <TableRow key={item.notice_id}>
              <TableCell>{formatDate(item.time)}</TableCell>
              <TableCell>
                <Link href={`/dashboard/allNoticeView/${item.notice_id}`}>
                  {item.notice.slice(0, 20)} &nbsp;
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
