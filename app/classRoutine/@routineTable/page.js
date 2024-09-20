"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";

export default function ClassRoutine() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    classRoutine: [],
    classTimes: [],
    weekdays: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/classRoutine`
        );
        let json = await res.json();

        setData({
          classRoutine: json.data.classRoutine || [],
          classTimes: json.data.classTimes || [],
          weekdays: json.data.weekdays || [],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const { classRoutine, classTimes, weekdays } = data;

  return (
    <div className="min-h">
      <h1 className="text-center p-4 text-3xl">Class Routine</h1>
      <Table
        aria-label="Class Routine"
        classNames={{
          table: "min-h",
        }}
      >
        <TableHeader>
          <TableColumn key="weekday">Weekday</TableColumn>
          {classTimes.map((time) => (
            <TableColumn key={time.class_time_id}>{time.time}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          items={weekdays}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent="No class routine found"
        >
          {(weekday) => (
            <TableRow key={weekday.day_id}>
              <TableCell>{weekday.weekday_name}</TableCell>
              {classTimes.map((time) => {
                const routine = classRoutine.find(
                  (r) =>
                    r.weekday === weekday.day_id &&
                    r.starting_time === time.class_time_id
                );
                return (
                  <TableCell key={time.class_time_id}>
                    {routine ? (
                      <>
                        <div>{routine.course_name}</div>
                        <div>{routine.teacher_name}</div>
                      </>
                    ) : (
                      "No Class"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
