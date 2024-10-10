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

export default function MarkInput() {
  const [section, setSection] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

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

  const loadCourses = async (departmentId) => {
    let res = await fetch(`/api/getCourseInfo/?department=${departmentId}`);
    let json = await res.json();
    setFilteredCourses(json.data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (selectedDepartment && selectedCourse && section) {
      const departmentId = selectedDepartment.department_id;
      const courseId = selectedCourse.course_id;

      let res = await fetch("/api/searchCTResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: departmentId,
          course_id: courseId,
          section: section,
        }),
      });
      let json = await res.json();
      console.log(json);
    } else {
      console.error("Please select valid department, course, and section.");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col items-center mt-6">
      <div className="flex flex-col md:flex-row md:space-x-4 w-full">
        <Autocomplete
          isRequired
          label="Department"
          placeholder="CSE"
          inputValue={department.filterText}
          isLoading={department.isLoading}
          items={department.items}
          onInputChange={department.setFilterText}
          onSelectionChange={(key) => {
            const selectedItem = department.items.find(
              (item) => item.department_id === key
            );
            setSelectedDepartment(selectedItem);
            setSelectedCourse(null);
            setFilteredCourses([]);
            loadCourses(selectedItem);
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
          isDisabled={selectedDepartment == null}
          isRequired
          label="Course"
          placeholder="3201"
          inputValue={
            selectedCourse ? selectedCourse.course_code.toString() : ""
          }
          isLoading={false}
          items={filteredCourses}
          onInputChange={filteredCourses.filterText}
          onSelectionChange={(key) => {
            const selectedItem = filteredCourses.find(
              (item) => item.course_id === key
            );
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
        <Button type="submit" color="warning" variant="flat">
          Search
        </Button>
      </div>
    </form>
  );
}
