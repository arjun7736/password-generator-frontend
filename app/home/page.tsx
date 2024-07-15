"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import axios from "../../utils/axiosConfig";

import Cards from "@/components/cards";
import Header from "@/components/homehead";

export default function Home() {
  const [passwords, setPasswords] = useState([]);
  const getPass = async () => {
    await axios
      .get("/api/pass/get-password")
      .then((response) => {
        setPasswords(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        axios.delete(`/api/pass/delete-password/${id}`);
        getPass();
        toast.success("Password Deleted SuccessFully");
      }
    });
  };

  useEffect(() => {
    getPass();
  }, []);

  return (
    <>
      <Header getPass={getPass} />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  gap-5">
        {passwords.map((password: pass) => (
          <Cards
            key={password._id}
            handleDelete={() => handleDelete(password._id)}
            name={password.name}
            password={password.password}
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
