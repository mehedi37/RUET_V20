import greetings from "@/lib/greetings";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default async function DashBoard() {
  const greeting = await greetings();
  return (
    <>
      <div className="text-center m-6">
        <h1 className="text-3xl">{greeting}</h1>
        <Button
          color="success"
          className="mt-6"
          variant="flat"
          startContent={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
        >
          Add Notice
        </Button>
      </div>
    </>
  );
}
