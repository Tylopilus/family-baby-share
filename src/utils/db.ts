import { PrismaClient } from '@prisma/client';
import type { Children } from '@prisma/client';
import { supabase } from './supabase';
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
  if (!hash) return false;
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

export type TAccessType = {
  loggedIn: boolean;
  access: 'account' | 'guest' | null;
};
export function getLoginToken(cookies: string | null): string | undefined {
  if (!cookies) return undefined;
  const loginToken = cookies
    .split('; ')
    .find((item) => item.startsWith('access_token='))
    ?.split('=')[1];
  return loginToken;
}
export async function checkLogin(cookies: string | null): Promise<TAccessType> {
  const unauthenticated = {
    loggedIn: false,
    access: null,
  };
  if (!cookies) return unauthenticated;
  const familyShareAccess = cookies
    ?.split('; ')
    .find((item) => item.startsWith('familyShareAccess='));
  const familyShareAccessToken = familyShareAccess?.split('=')[1];
  const loginToken = getLoginToken(cookies);
  if (loginToken) {
    const { user } = await supabase.auth.api.getUser(loginToken);
    if (user) {
      return {
        loggedIn: true,
        access: 'account',
      };
    }
  }
  if (familyShareAccess) {
    const result = await prisma.hash.findFirst({
      where: {
        hash: familyShareAccessToken,
      },
    });
    if (result) {
      return {
        loggedIn: true,
        access: 'guest',
      };
    }
  }
  return unauthenticated;
}

export async function getUser(loginToken: string | undefined) {
  if (!loginToken) return null;
  const { user } = await supabase.auth.api.getUser(loginToken);
  return user;
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
