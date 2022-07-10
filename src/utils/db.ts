import { PrismaClient } from '@prisma/client';
import type { Children } from '@prisma/client';
const prisma = new PrismaClient();

export async function getHash(hash: string): Promise<string> {
  const result = await prisma.hash.findFirst({
    where: {
      hash,
    },
  });
  if (result) {
    return result.hash;
  }
  return 'not found';
}

export async function isLoggedIn(hash: string): Promise<boolean> {
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

export async function getChildren(hash: string): Promise<
  (Children & {
    hash: String;
  })[]
> {
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
