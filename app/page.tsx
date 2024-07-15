"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";

import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  const { data: session } = useSession();

  const googleLogin = async () => {
    await signIn();
  };

  if (session?.user?.email !== undefined) {
    localStorage.setItem("email", `${session?.user?.email}`);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make Your&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Password&nbsp;</h1>
        <br />
        <h1 className={title()}>Stronger</h1>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            radius: "full",
            variant: "bordered",
          })}
          onClick={googleLogin}
        >
          <FcGoogle size={20} />
          Google
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
