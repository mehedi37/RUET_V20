"use client";
import { useState } from "react";
import Link from "next/link";
import EyeButton from "@/components/eyeButton";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

export default function Registration() {
  let [accountType, setAccountType] = useState("student");
  function handleAccountTypeChange(e) {
    setAccountType(e.target.value);
  }

  let [isLoading, setIsLoading] = useState(false);

  let [submitStatus, setSubmitStatus] = useState(null);

  function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setSubmitStatus("success");
        } else {
          setSubmitStatus("error");
        }
        setIsLoading(false);
        // console.log("Success:", data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
        setSubmitStatus("error");
      });
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
              Join Our Family
            </h2>
          </div>
          {submitStatus === "success" ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">
                Success! Click here to &nbsp;
                <Link href="/login" className="underline text-blue-500">
                  Login
                </Link>
              </strong>
            </div>
          ) : submitStatus === "error" ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
            </div>
          ) : null}
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={formSubmit}
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="account-type" className="sr-only">
                  Account Type
                </label>
                <Select
                  id="accountType"
                  name="accountType"
                  value={accountType}
                  label="Select an account type"
                  className="max-w"
                  onChange={handleAccountTypeChange}
                >
                  <SelectItem value="student" key="student">
                    Student
                  </SelectItem>
                  <SelectItem value="teacher" key="teacher">
                    Teacher
                  </SelectItem>
                </Select>
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  autoComplete="name"
                  required
                  isRequired
                />
              </div>

              {accountType === "student" && (
                <div>
                  <label htmlFor="roll" className="sr-only">
                    Roll
                  </label>
                  <Input
                    id="roll"
                    name="roll"
                    label="Roll"
                    type="number"
                    min={0}
                    autoComplete="roll"
                    required
                    isRequired
                  />
                </div>
              )}

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  required
                  isRequired
                />
              </div>
              <div className="flex">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  label="Password"
                  minLength={6}
                  type="password"
                  autoComplete="current-password"
                  required
                  isRequired
                  endContent={<EyeButton passwordID="password" />}
                />
              </div>
            </div>
            <div>
              <Button
                isLoading={isLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "Loading..." : "Register"}
              </Button>
            </div>
          </form>
          <small className="block text-center text-white">
            Already have an account?&nbsp;
            <Link href="/login" className="underline text-blue-500">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
