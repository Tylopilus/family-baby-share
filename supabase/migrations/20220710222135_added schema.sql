-- CreateTable
CREATE TABLE IF NOT EXISTS "Hash" (
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hash_pkey" PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "AccessHashTable" (
    "childrenId" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "AccessHashTable_pkey" PRIMARY KEY ("childrenId","hash")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Children" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccessHashTable" ADD CONSTRAINT "AccessHashTable_hash_fkey" FOREIGN KEY ("hash") REFERENCES "Hash"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessHashTable" ADD CONSTRAINT "AccessHashTable_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
