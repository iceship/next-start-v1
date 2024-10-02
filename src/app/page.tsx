import Link from "next/link";
import { redirect } from "next/navigation";

import { Card, CardBody } from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";

import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log("session", session);
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <>
      <Card className="mx-auto mt-4 max-w-md">
        <CardBody className="text-center">
          <h1 className="text-5xl">Next.js Starter</h1>
          <p className="text-xl">A simple starter for Next.js</p>
        </CardBody>
      </Card>
      <Card className="mx-auto mt-4 max-w-md">
        <CardBody className="text-center">
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <div className="flex justify-center">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="flex items-center rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              <IconBrandGoogle className="mr-2" />
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
