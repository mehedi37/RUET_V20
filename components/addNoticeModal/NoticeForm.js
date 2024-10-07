import { Input, Textarea, DatePicker, Button } from "@nextui-org/react";
import { useState } from "react";

export default function NoticeForm({ onSubmit, fields }) {
  const [errors, setErrors] = useState({});

  const handleValidation = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (!value) {
      error = "This field is required";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Please enter a valid email";
    } else if (name === "course_id" && isNaN(value)) {
      error = "Please enter a valid course ID";
    } else if (name === "department" && isNaN(value)) {
      error = "Please enter a valid department number";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formErrors = {};

    fields.forEach((field) => {
      const value = formData.get(field.name);
      if (!value) {
        formErrors[field.name] = "This field is required";
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "textarea" ? (
            <Textarea
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              label={field.label}
              variant="bordered"
              radius="sm"
              className="mb-4"
              onBlur={handleValidation}
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name]}
            />
          ) : field.type === "date" ? (
            <DatePicker
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              label={field.label}
              variant="bordered"
              radius="sm"
              className="mb-4"
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name] || "Please enter a valid date"}
            />
          ) : (
            <Input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              label={field.label}
              variant="bordered"
              radius="sm"
              className="mb-4"
              onBlur={handleValidation}
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name]}
            />
          )}
        </div>
      ))}
      <div className="flex justify-end mt-2">
        <Button type="submit" radius="sm" variant="flat" color="warning">
          Submit
        </Button>
      </div>
    </form>
  );
}
