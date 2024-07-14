"use client";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FcSearch } from "react-icons/fc";

import PasswordModal from "./passwordmodal";

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex items-end justify-end gap-4 mb-10">
        <Input
          className="w-2/4"
          endContent={<FcSearch size={18} />}
          placeholder="Search...."
        />
        <Button variant="bordered" onClick={onOpen}>
          Save a Password
        </Button>
        <Button color="primary">Create New Password</Button>
      </div>
      <PasswordModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
