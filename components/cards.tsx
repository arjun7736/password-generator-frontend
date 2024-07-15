import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Code } from "@nextui-org/code";
import { MdDelete } from "react-icons/md";

export default function Cards({
  name,
  password,
  handleDelete,
}: {
  name: string;
  password: string;
  handleDelete: () => void;
}) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-start">
        <h4 className="font-bold text-large">{name}</h4>
        <MdDelete className="cursor-pointer" onClick={handleDelete} />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Code>{password}</Code>
      </CardBody>
    </Card>
  );
}
