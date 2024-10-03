import { Suspense } from "react";

import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";
import requireAuth from "@/utils/require-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return (
    <Layout>
      <Suspense>{children}</Suspense>
    </Layout>
  );
}
