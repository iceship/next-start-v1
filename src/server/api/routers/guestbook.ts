import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const guestbookRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Guestbook ${input.text}`,
      };
    }),

  guestbookList: protectedProcedure.query(async ({ ctx }) => {
    const guestbooks = await ctx.db.guestbookEntries.findMany({
      orderBy: { createdAt: "desc" },
      where: { user: { id: ctx.session.user.id } },
    });
    return guestbooks ?? null;
  }),
  create: protectedProcedure
    .input(z.object({ message: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.guestbookEntries.create({
        data: {
          message: input.message,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const guestbook = await ctx.db.guestbookEntries.findFirst({
      orderBy: { createdAt: "desc" },
      where: { user: { id: ctx.session.user.id } },
    });

    return guestbook ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
