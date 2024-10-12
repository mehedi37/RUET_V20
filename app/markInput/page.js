"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Button,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { SearchIcon } from "@/icons/search";
import { useState, useEffect } from "react";
import { MarksPartial } from "./marksPartial";

export default function MarkInput() {
  const [section, setSection] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [rows, setRows] = useState([]);

  let course = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(`/api/getCourseInfo/?search=${filterText}`, {
        signal,
      });
      let json = await res.json();

      return {
        items: json.data,
      };
    },
  });

  let department = useAsyncList({
    async load({ signal, filterText }) {
      let res = await fetch(`/api/getDeptInfo/?search=${filterText}`, {
        signal,
      });
      let json = await res.json();

      return {
        items: json.data,
      };
    },
  });

  useEffect(() => {
    if (selectedDepartment) {
      const filtered = course.items.filter(
        (item) => item.department === selectedDepartment.department_id
      );
      setFilteredCourses(filtered);
    }
  }, [selectedDepartment, course.items]);

  async function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedDepartment || !selectedCourse || !section) {
      console.error("Please select valid department, course, and section.", {
        selectedDepartment,
        selectedCourse,
        section,
      });
      setIsLoading(false);
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.department = selectedDepartment.department_id;
    data.course_id = selectedCourse.course_id;
    data.section = section;

    try {
      const response = await fetch("/api/searchCTResult", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.status === 200) {
        setSubmitStatus("success");
        setRows(result.data);
      } else {
        console.error("Error:", result.error);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={formSubmit}
        method="POST"
        className="flex flex-col items-center mt-6"
      >
        <div className="flex flex-col md:flex-row md:space-x-4 w-full">
          <Autocomplete
            name="department"
            isRequired
            label="Department"
            placeholder="CSE"
            inputValue={department.filterText}
            isLoading={department.isLoading}
            items={department.items}
            onInputChange={department.setFilterText}
            onSelectionChange={(key) => {
              const selectedItem = department.items.find(
                (item) => item.department_id === parseInt(key)
              );
              setSelectedDepartment(selectedItem);
            }}
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            color="success"
            variant="bordered"
            className="mb-4 md:mb-0 w-full"
          >
            {(item) => (
              <AutocompleteItem key={item.department_id} className="capitalize">
                {item.dept_short_name}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Autocomplete
            name="course_id"
            isDisabled={!selectedDepartment}
            isRequired
            label="Course"
            placeholder="3201"
            inputValue={course.filterText}
            isLoading={course.isLoading}
            items={filteredCourses}
            onInputChange={course.setFilterText}
            onSelectionChange={(key) => {
              const selectedItem = course.items.find(
                (item) => item.course_id === parseInt(key)
              );
              console.log("Selected Course: ", selectedItem);
              console.log("Filter text: ", course.filterText);
              setSelectedCourse(selectedItem);
            }}
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            color="success"
            variant="bordered"
            className="mb-4 md:mb-0 w-full"
          >
            {(item) => {
              const courseName =
                item.course_code.toString() + " - " + item.course_name;
              return (
                <AutocompleteItem
                  key={item.course_id}
                  textValue={item.course_name}
                  className="capitalize"
                >
                  {courseName.toString()}
                </AutocompleteItem>
              );
            }}
          </Autocomplete>

          <Input
            name="section"
            isRequired
            label="Section"
            placeholder="A or B or C"
            color="success"
            variant="bordered"
            className="mb-4 md:mb-0 w-full"
            value={section}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              if (value.length <= 1 && /^[A-C]?$/.test(value)) {
                setSection(value);
              }
            }}
          />
        </div>

        <div className="flex justify-center mt-4 w-full">
          <Button
            type="submit"
            color="warning"
            variant="flat"
            isLoading={isLoading}
          >
            Search
          </Button>
        </div>
      </form>

      {submitStatus === "success" && <MarksPartial rows={rows} />}
    </>
  );
}
