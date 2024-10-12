import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Chip,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    key: "student_roll",
    label: "ROLL",
  },
  {
    key: "ct_1",
    label: "CT 01",
  },
  {
    key: "ct_2",
    label: "CT 02",
  },
  {
    key: "ct_3",
    label: "CT 03",
  },
  {
    key: "ct_4",
    label: "CT 04",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export function MarksPartial({ rows }) {
  console.log("Columns: ", columns);
  console.log("Rows: ", rows);
  return (
    <>
      <div className="flex justify-center mt-4">
        <Chip className="m-2 " color="success" variant="bordered">
          Students Found: {rows.length}
        </Chip>
      </div>
      <Table aria-label="Students CT Marks">
        <TableHeader columns={columns} align="center">
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} align="center">
          {(item) => (
            <TableRow key={item.ct_result_id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "action" ? (
                    <Tooltip content="Save Changes">
                      <Button
                        isIconOnly
                        color="success"
                        variant="ghost"
                        className="text-center"
                      >
                        <FontAwesomeIcon icon={faCircleCheck} className="" />
                      </Button>
                    </Tooltip>
                  ) : column.key === "student_roll" ? (
                    getKeyValue(item, column.key)
                  ) : (
                    <Input
                      name="student_roll"
                      value={getKeyValue(item, column.key)}
                      className="text-center"
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
