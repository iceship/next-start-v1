import { z } from "zod";

export const InsertGuestbookEntrySchema = z.object({
  message: z.string().min(1, "Message is required"),
});
