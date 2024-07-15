"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "../../utils/axiosConfig";

import Cards from "@/components/cards";
import Header from "@/components/homehead";

export default function Home() {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    getPass();
  }, []);
  const getPass = async () => {
    await axios
      .get("/api/pass/get-password")
      .then((response) => {
        setPasswords(response.data);
      })
      .catch((error) => {
        toast(error.response.data.error);
      });
  };

  return (
    <>
      <Header />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  gap-5">
        {passwords.map((password: pass) => (
          <Cards
            key={password?._id}
            name={password?.name}
            password={password?.password}
          />
        ))}
      </div>
    </>
  );
}

interface pass {
  _id: string;
  name: string;
  password: string;
}
