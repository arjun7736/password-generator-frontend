import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Code } from "@nextui-org/code";

export default function Cards({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  return (
    <Card className="py-4 hover:cursor-pointer">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Code>{password}</Code>
      </CardBody>
    </Card>
  );
}
