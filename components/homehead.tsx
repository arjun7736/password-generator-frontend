"use client";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FcSearch } from "react-icons/fc";
import { useState } from "react";

import PasswordModal from "./passwordmodal";

import { generateRandomPassword } from "@/utils/createPass";

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newPassword, setPassword] = useState("");

  const newPasswordclick = () => {
    const generatedPassword = generateRandomPassword();

    setPassword(generatedPassword);
    onOpen();
  };

  const savePassword = () => {
    setPassword("");
    onOpen();
  };

  return (
    <>
      <div className="flex items-end justify-end gap-4 mb-10">
        <Input
          className="w-2/4"
          endContent={<FcSearch size={18} />}
          placeholder="Search...."
        />
        <Button variant="bordered" onClick={savePassword}>
          Save a Password
        </Button>
        <Button color="primary" onClick={newPasswordclick}>
          Create New Password
        </Button>
      </div>
      <PasswordModal
        isOpen={isOpen}
        newPassword={newPassword}
        setPassword={setPassword}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
