"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import requireAuth from "@/utils/require-auth";

import { InsertGuestbookEntrySchema } from "./schema";

export async function createGuestbookEntry(
  prevState: unknown,
  formData: FormData
) {
  await requireAuth();
  const submission = parseWithZod(formData, {
    schema: InsertGuestbookEntrySchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const session = (await getServerAuthSession())!;

  await db.guestbookEntries.create({
    data: {
      userId: session.user.id,
      message: submission.value.message,
    },
  });

  revalidatePath("/guestbook");
  redirect("/guestbook");
}
