"use client";

import { Button } from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export default function AuthButton({ minimal = true }: { minimal?: boolean }) {
  console.log(minimal);
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/profile",
        })
      }
      color="danger"
      variant="ghost"
    >
      <IconBrandGoogle />
      Sign In
    </Button>
  );
}
