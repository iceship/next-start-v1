import Link from "next/link";

import { Card, CardBody } from "@nextui-org/react";

import { getServerAuthSession } from "@/server/auth";
import { HydrateClient, api } from "@/trpc/server";

import { LatestGuestbook } from "./_components/guestbook";
import { LatestPost } from "./_components/post";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  void api.post.getLatest.prefetch();
  void api.guestbook.getLatest.prefetch();
  return (
    <HydrateClient>
      <Card className="mx-auto mt-4 max-w-md">
        <CardBody className="text-center">
          <h1 className="text-5xl">Next.js Starter</h1>
          <p className="text-xl">A simple starter for Next.js</p>
          <p className="mt-4 text-lg">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </CardBody>
      </Card>
      <Card className="mx-auto mt-4 max-w-md">
        <CardBody className="text-center">
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <div className="mt-4 flex justify-center">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </CardBody>
      </Card>
      <Card className="mx-auto mt-4 max-w-md">
        <CardBody>{session?.user && <LatestPost />}</CardBody>
      </Card>
      <Card className="mx-auto mt-4 max-w-md">
        <CardBody>{session?.user && <LatestGuestbook />}</CardBody>
      </Card>
    </HydrateClient>
  );
}
