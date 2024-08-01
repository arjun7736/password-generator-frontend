"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from "../../utils/axiosConfig";

import Cards from "@/components/cards";
import Header from "@/components/homehead";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  let [passwords, setPasswords] = useState([]);
  const { data: session } = useSession();
  let data: string | null | undefined = null;

  if (session) {
    data = session?.user?.email;
  } else {
    router.push("/");
  }
  const getPass = async () => {
    await axios
      .get(`/api/pass/get-password/${data}`)
      .then((response) => {
        setPasswords(response.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
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
  if (search) {
    const result = passwords.filter(
      (user: { _id: string; name: string; user: string; password: string }) =>
        user.name === search,
    );

    passwords = result;
  }

  return (
    <>
      <Header getPass={getPass} setSearch={setSearch} />
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
