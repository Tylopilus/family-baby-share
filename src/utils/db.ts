import { PrismaClient } from '@prisma/client';
import type { Children } from '@prisma/client';
const prisma = new PrismaClient();

export async function getHash(hash: string): Promise<string | null> {
  const result = await prisma.hash.findFirst({
    where: {
      hash,
    },
  });
  if (result) {
    return result.hash;
  }
  return null;
}

export async function getInviteHash(hash: string): Promise<string | null> {
  const result = await prisma.inviteHash.findFirst({
    where: {
      hash,
    },
  });
  if (result) {
    return result.hash;
  }
  return null;
}

export async function createHash(hash: string): Promise<string> {
  const result = await prisma.hash.create({
    data: {
      hash,
      AccessHashTable: { create: [{ childrenId: 1 }] },
    },
  });
  return result.hash;
}

export async function deleteInviteHash(hash: string): Promise<void> {
  await prisma.inviteHash.delete({
    where: {
      hash,
    },
  });
}

export async function isLoggedIn(hash: string | undefined): Promise<boolean> {
  const result = await prisma.hash.findFirst({
    where: {
      hash,
    },
  });
  if (result) {
    return true;
  }
  return false;
}

export async function getChildren(hash: string | undefined): Promise<
  (Children & {
    hash: String;
  })[]
> {
  if (!hash) {
    return [];
  }
  const dbResult = await prisma.accessHashTable.findMany({
    where: {
      hash,
    },
    include: {
      children: true,
    },
  });
  const result = dbResult.map((item) => {
    return {
      ...item.children,
      hash,
    };
  });
  if (result.length === 0) return [];
  return result;
}
