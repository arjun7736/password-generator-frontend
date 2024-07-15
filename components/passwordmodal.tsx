"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Snippet } from "@nextui-org/snippet";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import axios from "../utils/axiosConfig";

export default function PasswordModal({
  isOpen,
  onOpenChange,
  newPassword,
  setPassword,
}: PasswordModalProps) {
  const [password, setPAsswordInput] = useState("");
  const [name, setNameInput] = useState("");
  const cancel = () => {
    if (setPassword) {
      setPassword("");
    }
    onOpenChange(false);
  };
  const { data: session } = useSession();

  const save = async () => {
    const passwordToSave = newPassword ? newPassword : password;

    await axios
      .post("/api/pass/add-password", {
        name: name,
        password: passwordToSave,
        user: session?.user?.email,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
    if (setPassword) {
      setPassword("");
    }
    onOpenChange(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Save Password
              </ModalHeader>
              <ModalBody>
                <Input
                  label="name"
                  placeholder="Enter Name For Password"
                  variant="bordered"
                  onChange={(e) => setNameInput(e.target.value)}
                />
                {newPassword ? (
                  <Snippet hideSymbol={true}>{newPassword}</Snippet>
                ) : (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    onChange={(e) => setPAsswordInput(e.target.value)}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={cancel}>
                  Cancel
                </Button>
                <Button color="primary" onPress={save}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

interface PasswordModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newPassword?: string;
  setPassword?: (password: string) => void;
}
