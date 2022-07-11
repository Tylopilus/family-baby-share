-- CreateTable
CREATE TABLE "InviteHash" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT NOT NULL,

    CONSTRAINT "InviteHash_pkey" PRIMARY KEY ("id")
);
