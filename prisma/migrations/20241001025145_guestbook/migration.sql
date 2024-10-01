-- CreateTable
CREATE TABLE "GuestbookEntries" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestbookEntries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuestbookEntries" ADD CONSTRAINT "GuestbookEntries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
