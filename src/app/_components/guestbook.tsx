"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestGuestbook() {
  const [latestGuestbook] = api.guestbook.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [message, setMessage] = useState("");
  const createGuestbook = api.guestbook.create.useMutation({
    onSuccess: async () => {
      await utils.guestbook.invalidate();
      setMessage("");
    },
    onError: (error) => {
      console.error("Failed to create guestbook", error);
    },
  });

  return (
    <div className="mx-auto w-full max-w-xs text-center">
      {latestGuestbook ? (
        <p className="truncate">
          Your most recent guestbook: {latestGuestbook.message}
        </p>
      ) : (
        <p>You have no guestbooks yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createGuestbook.mutate({ message });
        }}
        className="mt-4 flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black dark:text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createGuestbook.isPending}
        >
          {createGuestbook.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
