import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

export default async function requireAuth() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return session;
}
