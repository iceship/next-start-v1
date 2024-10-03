"use client";

import {
  Button,
  Card,
  CardBody,
  CircularProgress,
  User,
} from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <CircularProgress aria-label="Loading authentication status..." />;
  }

  if (status === "authenticated") {
    const signOutClick = () =>
      signOut({
        callbackUrl: "/",
      });
    return (
      <>
        <Card className="mx-auto mt-4 max-w-md">
          <CardBody className="flex flex-row items-center justify-between px-4">
            <User
              name={data.user?.name}
              description={data.user?.email}
              avatarProps={{
                showFallback: !data.user?.image,
                src: data.user?.image || "",
              }}
            />
            <Button onClick={signOutClick} color="danger" variant="ghost">
              Sign Out
            </Button>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <Button
      size="lg"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
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
